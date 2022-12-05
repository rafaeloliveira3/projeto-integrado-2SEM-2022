import base from './helpers/baseUrl.js'

const pizzas = async () => {
    const url = base + 'pizzas'
    const res = await fetch(url)
    
    const pizza = await res.json()
    return pizza.pizza
}

export {
    pizzas
}