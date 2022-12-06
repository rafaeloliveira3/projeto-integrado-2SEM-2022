import base from './helpers/baseUrl.js'

const bebidas = async () => {
    const url = base + 'bebidas'
    const res = await fetch(url)
    
    const bebida = await res.json()
    return bebida.drinks
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
export {
    bebidas,
    searchBebidas
}