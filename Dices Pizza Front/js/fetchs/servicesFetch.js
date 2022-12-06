import base from './helpers/baseUrl.js'

const services = async () => {
    const url = base + 'servico'
    const res = await fetch(url)
    
    const servico = await res.json()
    return servico.servicos
}

export {
    services
}