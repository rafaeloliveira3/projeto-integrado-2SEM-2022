import base from './helpers/baseUrl.js'

const pizzas = async () => {
    const url = base + 'pizzas'
    const res = await fetch(url)
    
    const pizza = await res.json()

    let result = pizza.pizza
    result.map(item => item.tipo = 'pizza')

    return result
}
const favoritas = async () => {
    const url = base + 'favoritas/pizzas'
    const res = await fetch(url)

    const pizza = await res.json()
    return pizza.pizza
}
const searchPizza = async(pizzaName) => {
    const prompt = pizzaName.replace(' ', '%20')
    const url = base + `pizza/?pizza=${prompt}`
    const res = await fetch(url)

    if (res.status == 404) {
        return res.status
    }

    const pizza = await res.json()
    return pizza.Pizza
}

const pizzaId = async(id) => {
    const url = base + `pizzas/${id}`
    const res = await fetch(url)

    const pizza = await res.json()
    console.log(pizza);
    return pizza.pizza[0]
}
export {
    pizzas,
    favoritas,
    searchPizza,
    pizzaId
}