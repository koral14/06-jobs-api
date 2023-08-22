async function buildRecipesTable(recipesTable, recipesTableHeader, token, message) {
  try {
    const response = await fetch("/api/v1/recipes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    var children = [recipesTableHeader];
    if (response.status === 200) {
      if (data.count === 0) {
        recipesTable.replaceChildren(...children); // clear this for safety
        return 0;
      } else {
        for (let i = 0; i < data.recipes.length; i++) {
          let editButton = `<td><button type="button" class="editButton" data-id=${data.recipes[i]._id}>edit</button></td>`;
          let deleteButton = `<td><button type="button" class="deleteButton" data-id=${data.recipes[i]._id}>delete</button></td>`;
          let rowHTML = `<td>${data.recipes[i].recipeName}</td><td>${data.recipes[i].region}</td><td>${data.recipes[i].typeOfFood}</td><td>${data.recipes[i].ingredients}</td><td>${data.recipes[i].recipeDescription}</td><td>${data.recipes[i].glutenFree}</td>${editButton}${deleteButton}`;
          let rowEntry = document.createElement("tr");
          rowEntry.innerHTML = rowHTML;
          children.push(rowEntry);
        }
        recipesTable.replaceChildren(...children);
      }
      return data.count;
    } else {
      message.textContent = data.msg;
      return 0;
    }
  } catch (err) {
    message.textContent = "A communication error occurred.";
    return 0;
  }
}

document.addEventListener("DOMContentLoaded", () => {
    const logoff = document.getElementById("logoff");
    const message = document.getElementById("message");
    const logonRegister = document.getElementById("logon-register");
    const logon = document.getElementById("logon");
    const register = document.getElementById("register");
    const logonDiv = document.getElementById("logon-div");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const logonButton = document.getElementById("logon-button");
    const logonCancel = document.getElementById("logon-cancel");
    const registerDiv = document.getElementById("register-div");
    const name = document.getElementById("name");
    const email1 = document.getElementById("email1");
    const password1 = document.getElementById("password1");
    const password2 = document.getElementById("password2");
    const registerButton = document.getElementById("register-button");
    const registerCancel = document.getElementById("register-cancel");
    const recipes = document.getElementById("recipes");
    const recipesTable = document.getElementById("recipes-table");
    const recipesTableHeader = document.getElementById("recipes-table-header");
    const addRecipe = document.getElementById("add-recipe");
    const editRecipe = document.getElementById("edit-recipe");
    const recipeName = document.getElementById("recipeName");
    const region = document.getElementById("region");
    const typeOfFood = document.getElementById("typeOfFood");
    const ingredients = document.getElementById("ingredients");
    const recipeDescription = document.getElementById("recipeDescription");
    const glutenFree = document.getElementById("glutenFree");
    //
    const addingRecipe = document.getElementById("adding-recipe");
    const recipesMessage = document.getElementById("recipes-message");
    const editCancel = document.getElementById("edit-cancel");
  
    // section 2 
    let showing = logonRegister;
  let token = null;
  document.addEventListener("startDisplay", async () => {
    showing = logonRegister;
    token = localStorage.getItem("token");
    if (token) {
      //if the user is logged in
      logoff.style.display = "block";
      const count = await buildRecipesTable(
        recipesTable,
        recipesTableHeader,
        token,
        message
      );
      if (count > 0) {
        recipesMessage.textContent = "";
        recipesTable.style.display = "block";
      } else {
        recipesMessage.textContent = "There are no recipes to display for this user.";
        recipesTable.style.display = "none";
      }
      recipes.style.display = "block";
      showing = recipes;
    } else {
      logonRegister.style.display = "block";
    }
  });

  var thisEvent = new Event("startDisplay");
  document.dispatchEvent(thisEvent);
  var suspendInput = false;

  // section 3
  document.addEventListener("click", async (e) => {
    if (suspendInput) {
      return; // we don't want to act on buttons while doing async operations
    }
    if (e.target.nodeName === "BUTTON") {
      message.textContent = "";
    }
    if (e.target === logoff) {
      localStorage.removeItem("token");
      token = null;
      showing.style.display = "none";
      logonRegister.style.display = "block";
      showing = logonRegister;
      recipesTable.replaceChildren(recipesTableHeader); // don't want other users to see
      message.textContent = "You are logged off.";
    } else if (e.target === logon) {
      showing.style.display = "none";
      logonDiv.style.display = "block";
      showing = logonDiv;
    } else if (e.target === register) {
      showing.style.display = "none";
      registerDiv.style.display = "block";
      showing = registerDiv;
    } else if (e.target === logonCancel || e.target == registerCancel) {
      showing.style.display = "none";
      logonRegister.style.display = "block";
      showing = logonRegister;
      email.value = "";
      password.value = "";
      name.value = "";
      email1.value = "";
      password1.value = "";
      password2.value = "";
    } else if (e.target === logonButton) {
      suspendInput = true;
      try {
        const response = await fetch("/api/v1/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          }),
        });
        const data = await response.json();
        if (response.status === 200) {
          message.textContent = `Logon successful.  Welcome ${data.user.name}`;
          token = data.token;
          localStorage.setItem("token", token);
          showing.style.display = "none";
          thisEvent = new Event("startDisplay");
          email.value = "";
          password.value = "";
          document.dispatchEvent(thisEvent);
        } else {
          message.textContent = data.msg;
        }
      } catch (err) {
        message.textContent = "A communications error occurred.";
      }
      suspendInput = false;
    } else if (e.target === registerButton) {
      if (password1.value != password2.value) {
        message.textContent = "The passwords entered do not match.";
      } else {
        suspendInput = true;
        try {
          const response = await fetch("/api/v1/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name.value,
              email: email1.value,
              password: password1.value,
            }),
          });
          const data = await response.json();
          if (response.status === 201) {
            message.textContent = `Registration successful.  Welcome ${data.user.name}`;
            token = data.token;
            localStorage.setItem("token", token);
            showing.style.display = "none";
            thisEvent = new Event("startDisplay");
            document.dispatchEvent(thisEvent);
            name.value = "";
            email1.value = "";
            password1.value = "";
            password2.value = "";
          } else {
            message.textContent = data.msg;
          }
        } catch (err) {
          message.textContent = "A communications error occurred.";
        }
        suspendInput = false;
      }
    } // section 4
    else if (e.target === addRecipe) {
      showing.style.display = "none";
      editRecipe.style.display = "block";
      showing = editRecipe;
      delete editRecipe.dataset.id;
      recipeName.value = "";
      region.value = "";
      typeOfFood.value = "";
      ingredients.value = "";
      recipeDescription.value = "";
      glutenFree.value = "false";
      addingRecipe.textContent = "add";
    } else if (e.target === editCancel) {
      showing.style.display = "none";
      recipeName.value = "";
      region.value = "";
      typeOfFood.value = "";
      ingredients.value = "";
      recipeDescription.value = "";
      glutenFree.value = "false";
      thisEvent = new Event("startDisplay");
      document.dispatchEvent(thisEvent);
    } else if (e.target === addingRecipe) {

      if (!editRecipe.dataset.id) {
        // this is an attempted add
        suspendInput = true;
        try {
          const response = await fetch("/api/v1/recipes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              recipeName: recipeName.value,
              region: region.value,
              typeOfFood: typeOfFood.value,
              ingredients: ingredients.value,
              recipeDescription: recipeDescription.value,
              glutenFree: glutenFree.value,
            }),
          });
          const data = await response.json();
          if (response.status === 201) {
            //successful create
            message.textContent = `Congratulations! The recipe entry was created.`;
            showing.style.display = "none";
            thisEvent = new Event("startDisplay");
            document.dispatchEvent(thisEvent);
            recipeName.value = "";
            region.value = "";
            typeOfFood.value = "";
            ingredients.value = "";
            recipeDescription.value = "";
            glutenFree.value = "false";
          } else {
            // failure
            message.textContent = data.msg;
          }
        } catch (err) {
          message.textContent = "A communication error occurred.";
        }
        suspendInput = false;
      } else {
        // this is an update
        suspendInput = true;
        try {
          const recipeID = editRecipe.dataset.id;
          const response = await fetch(`/api/v1/recipes/${recipeID}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              recipeName: recipeName.value,
              region: region.value,
              typeOfFood: typeOfFood.value,
              ingredients: ingredients.value,
              recipeDescription: recipeDescription.value,
              glutenFree: glutenFree.value,
            }),
          });
          const data = await response.json();
          if (response.status === 200) {
            message.textContent = `Congratulations ${data.user.name}! Your new recipe was successfully added.`;
            showing.style.display = "none";
            recipeName.value = "";
            region.value = "";
            typeOfFood.value = "";
            ingredients.value = "";
            recipeDescription.value = "";
            glutenFree.value = "false";
            thisEvent = new Event("startDisplay");
            document.dispatchEvent(thisEvent);
          } else {
            message.textContent = data.msg;
          }
        } catch (err) {

          message.textContent = "A communication error occurred.";
        }
      }
      suspendInput = false;
    } // section 5

    else if (e.target.classList.contains("editButton")) {
      editRecipe.dataset.id = e.target.dataset.id;
      suspendInput = true;
      try {
        const response = await fetch(`/api/v1/recipes/${e.target.dataset.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.status === 200) {
          recipeName.value = data.recipe.recipeName;
          region.value = data.recipe.region;
          typeOfFood.value = data.recipe.typeOfFood;
          ingredients.value = data.recipe.ingredients;
          recipeDescription.value = data.recipe.recipeDescription;
          glutenFree.value = data.recipe.glutenFree;
          showing.style.display = "none";
          showing = editRecipe;
          showing.style.display = "block";
          addingRecipe.textContent = "update";
          message.textContent = "";
        } else {
          // might happen if the list has been updated since last display
          message.textContent = "The recipe entry was not found";
          thisEvent = new Event("startDisplay");
          document.dispatchEvent(thisEvent);
        }
      } catch (err) {
        message.textContent = "A communications error has occurred.";
      }
      suspendInput = false;
    } else if (e.target.classList.contains("deleteButton")) {
      const recipeId = e.target.dataset.id;
      const confirmed = confirm("Are you sure you want to delete this recipe?");
      if (confirmed) {
        try {
          const response = await fetch(`/api/v1/recipes/${recipeId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (response.status === 200) {
            message.textContent = "Recipe deleted successfully.";
            thisEvent = new Event("startDisplay");
            document.dispatchEvent(thisEvent);
          } else {
            message.textContent = data.msg;
          }
        } catch (err) {
          message.textContent = "A communication error occurred.";
        }
      }
    }
  })
  });