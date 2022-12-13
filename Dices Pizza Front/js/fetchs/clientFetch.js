import base from './helpers/baseUrl.js'

const clientSubmit = async (json) => {
    const url = base + 'admin/cliente'
    const res = await fetch(url, {
        method : 'POST',
        headers : {'Content-type' : 'application/json'},
        body : JSON.stringify(json)
    })

    const clientInfo = {status : await res.status(), res : await res.json()}
    return clientInfo
}

const cliente = async () => {
    const url = base + 'admin/cliente'
    const res = await fetch(url)

    const clientes = await res.json()
    return clientes.client
}

export {
    clientSubmit,
    cliente
}