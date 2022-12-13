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
    return pizza.pizza[0]
}

const sabor = async () => {
    const url = base + 'pizza/sabor'
    const res = await fetch(url)

    const sabor = await res.json()
    return sabor.sabor
}

const saveProductPizza = async () => {
    const json = {
        nome : document.querySelector('#nome').value,
        preco : document.querySelector('#preco').value,
        descricao : document.querySelector('#especificacao').value,
        sabor : [document.querySelector('#sabor').value],
        categoria : [document.querySelector('#categorias-produtos').value]
    }

    const url = base + 'admin/pizza'
    const res = await fetch(url, {
        method : 'POST',
        headers : {'Content-type' : 'application/json'},
        body : JSON.stringify(json)
    })

    return {status : await res.status(), res : await res.json()}
}
const deletePizza = async (id) => {
    const url = base + `admin/pizza/${id}`
    const res = await fetch(url, {
        method : 'DELETE',
    })
    if (await res.status() == 200) {
        alert('Item deletado com Sucesso')
    }
    return {status : await res.status(), res : await res.json()}
}


const editPizza = async (id) => {
    const json = {
        nome : document.querySelector('#nome').value,
        preco : document.querySelector('#preco').value,
        descricao : document.querySelector('#especificacao').value,
        sabor : [document.querySelector('#sabor').value],
        categoria : [document.querySelector('#categorias-produtos').value]
    }
    const url = base + `admin/pizza/${id}`
    const res = await fetch(url, {
        method : 'PUT',
        headers : {'Content-type' : 'application/json'},
        body : JSON.stringify(json)
    })

    return {status : await res.status(), res : await res.json()}
}
export {
    pizzas,
    favoritas,
    searchPizza,
    pizzaId,
    sabor,
    saveProductPizza,
    deletePizza,
    editPizza
}