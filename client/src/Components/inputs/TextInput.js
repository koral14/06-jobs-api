import { useContext } from "react";
import { InputContext } from "../../App";
import "./inputStyles.css";

const TextInput = ({ type, placeholder, label, id, textarea, isRequired }) => {
  const [inputs, setInputs] = useContext(InputContext);

  const handleInputChange = (e) => {
    // Ensure that `inputs` is an object
    const newInputs = { ...inputs };
    newInputs[e.target.name] = e.target.value;
    setInputs(newInputs);
  };

  return (
    <>
      {!textarea ? (
        <label className="text-input-label" htmlFor={id}>
          {label}
          <input
            className="text-input"
            placeholder={placeholder}
            type={type}
            value={inputs[id] ?? ''}
            onChange={handleInputChange}
            id={id}
            name={id}
            required={isRequired}
          />
        </label>
      ) : (
        <label className="text-input-label" htmlFor={id}>
          {label}
          <textarea
            className="textarea-input"
            placeholder={placeholder}
            type={type}
            value={inputs[id]}
            onChange={handleInputChange}
            id={id}
            required
            name={id}
          />
        </label>
      )}
    </>
  );
};

export default TextInput;