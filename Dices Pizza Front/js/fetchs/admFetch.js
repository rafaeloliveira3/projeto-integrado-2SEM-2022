import base from './helpers/baseUrl.js'

const loginValidation = async (json) => {
    const url = base + 'adm/login'
    const res = await fetch(url, {
        method : 'POST',
        headers : {'Content-type' : 'application/json'},
        body : JSON.stringify(json)
    })
   
    const admId = await res.json()
    return admId.id
} 

const administrador = async () => {
    const url = base + 'adm'
    const res = await fetch(url)

    const adminis = await res.json()
    return adminis.admin
}

const searchAdm = async (id) => {
    const url = base + `adm/${id}`
    const res = await fetch(url)

    const adm = await res.json()
    return adm.admin[0]
}
export {
    loginValidation,
    searchAdm,
    administrador
}