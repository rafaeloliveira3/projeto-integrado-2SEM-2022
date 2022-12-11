import base from './helpers/baseUrl.js'

const loginValidation = async (json) => {
    const url = base + 'adm/login'
    const res = await fetch(url, {
        method : 'POST',
        headers : {'Content-type' : 'application/json'},
        body : JSON.stringify(json)
    })

    const admId = await res.json()
    return admId
} 

export {
    loginValidation
}