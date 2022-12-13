import base from './helpers/baseUrl.js'

const bebidas = async () => {
    const url = base + 'bebidas'
    const res = await fetch(url)
    
    const bebida = await res.json()

    let result = bebida.drinks
    result.map(item => item.tipo = 'bebida')

    return result
}
const searchBebidas = async (drinkName) => {
    const prompt = drinkName.replace(' ', '%20')
    const url = base + `bebida/?bebida=${prompt}`
    const res = await fetch(url)
    
    if (res.status == 404) {
        return res.status
    }
    const bebida = await res.json()
    return bebida.drink
}
const bebidaId = async (id) => {
    const url = base + `bebida/${id}`
    const res = await fetch(url)

    const bebida = await res.json()
    return bebida.drink[0]
}
export {
    bebidas,
    searchBebidas,
    bebidaId
}