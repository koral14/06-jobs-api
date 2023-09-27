export const getCookie = (cName) => {
    const cDecoded = decodeURIComponent(document.cookie)
    const cArray = cDecoded.split('; ')
    let result = null

    cArray.forEach((element) => {
        if (element.indexOf(cName) === 0) {
            result = element.substring(cName.length + 1)
        }
    })

    let jsonObj = null
    try {
        if (result !== null) {
            jsonObj = JSON.parse(result)
        }
    } catch (error) {
        console.error('Invalid JSON string:', error)
    }
    return jsonObj
}

export const cookieName = 'yummy-session'