'use strict'

import { bebidas } from "./fetchs/drinkFetch.js"
import { pizzas } from "./fetchs/pizzaFetch.js"

const container = document.getElementById('container')

const produtos = async () => {
    const pizzas = await pizzas()
    const bebidas = await bebidas()

    const cardsPizza = pizzas.map(cardBuilder)
}
const categorias = async () => {
    console.log('categorias');
}
const usuarios = async () => {
    console.log('usuarios');
}
const sabores = async () => {
    console.log('sabores');
}
const contatos = async () => {
    console.log('contatos');
}

const checker = (e) => {
    let id = e.currentTarget.id

    switch (id) {
        case 'produtos' :
            produtos()
            break
        case 'categorias' :
            categorias()
            break
        case 'usuarios' :
            usuarios()
            break
        case 'sabores' :
            sabores()
            break
        case 'contatos' :
            contatos()
            break
    }
}

const cardBuilder = (json) => {
    const card = document.createElement('div')

}


document.querySelectorAll('[name="choices"]').forEach(item => {
    item.addEventListener('change', checker)
})
