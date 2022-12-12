'use strict'

import { bebidas } from "./fetchs/drinkFetch.js"
import { pizzas } from "./fetchs/pizzaFetch.js"
import { searchAdm } from "./fetchs/admFetch.js"
import { productBuilder, helperBuild } from "./modules/dashboardBuilders.js"

const container = document.getElementById('container')

const load = async () => {
    const id = localStorage.getItem('admId')
    const adm = await searchAdm(id)

    document.querySelector('#adm-name').textContent = `${adm.nome}, Administrador`
}
load()
const produtos = async () => {
    helperBuild('Produtos')

    const pizza = await pizzas()
    const bebida = await bebidas()
    const cards = []

    pizza.map(cardBuilder).forEach(item => {
        cards.push(item)
        item.addEventListener('click', productBuilder)
    })
    bebida.map(cardBuilder).forEach(item => {
        cards.push(item)
        item.addEventListener('click', productBuilder)
    })

    
    container.replaceChildren(...cards)
}
const categorias = async () => {
    helperBuild('Categorias')

    const pizza = await pizzas()
    const bebida = await bebidas()
    const cards = []

    pizza.map(cardBuilder).forEach(item => {
        cards.push(item)
        item.addEventListener('click', productBuilder)
    })
    bebida.map(cardBuilder).forEach(item => {
        cards.push(item)
        item.addEventListener('click', productBuilder)
    })

    
    container.replaceChildren(...cards)
}
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
    container.innerHTML = `<i class="fas fa-spinner"></i>`
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
    card.classList.add('card')
    card.innerHTML = `${json.nome} <i class="fas fa-long-arrow-right"></i>`
    return card
}

document.querySelector('#exit').addEventListener('click', () => {
    localStorage.removeItem('admId')
})

document.querySelectorAll('[name="choices"]').forEach(item => {
    item.addEventListener('change', checker)
})
