'use strict'

import { bebidas } from "./fetchs/drinkFetch.js"
import { pizzas, sabor } from "./fetchs/pizzaFetch.js"
import { categoriaPizza, categoriaBebida } from "./fetchs/categoryFetch.js"
import { administrador } from "./fetchs/admFetch.js"
import { cliente } from "./fetchs/clientFetch.js"
import { searchAdm } from "./fetchs/admFetch.js"
import { productBuilder, categoryBuilder, helperBuild } from "./modules/dashboardBuilders.js"

const container = document.getElementById('container')

const load = async () => {
    const id = localStorage.getItem('admId')
    const adm = await searchAdm(id)

    document.querySelector('#adm-name').textContent = `${adm.nome}, Administrador`
}
load()
const produtos = async () => {
    helperBuild('Produtos', 'o')

    const pizza = await pizzas()
    const bebida = await bebidas()
    const cards = []

    pizza.map(cardBuilder).forEach(item => {
        item.classList.add('pizza')
        cards.push(item)
        item.addEventListener('click', productBuilder)
    })
    bebida.map(cardBuilder).forEach(item => {
        item.classList.add('bebida')
        cards.push(item)
        item.addEventListener('click', productBuilder)
    })

    document.querySelector('.new').addEventListener('click', productBuilder)
    container.replaceChildren(...cards)
}
const categorias = async () => {
    helperBuild('Categorias', 'a')

    const categoriasPizza = await categoriaPizza()
    const categoriasBebida = await categoriaBebida()
    const cards = []

    categoriasPizza.map(cardBuilder).forEach(item => {
        cards.push(item)
        item.addEventListener('click', categoryBuilder)
    })

    categoriasBebida.map(cardBuilder).forEach(item => {
        cards.push(item)
        item.addEventListener('click', categoryBuilder)
    })
    
    document.querySelector('.new').addEventListener('click', categoryBuilder)
    container.replaceChildren(...cards)
}
const usuarios = async () => {
    helperBuild('Usuarios', 'o')

    const administradores = await administrador()
    const cards = []

    administradores.map(cardBuilder).forEach(item => {
        cards.push(item)
        item.addEventListener('click', productBuilder)
    })
    
    container.replaceChildren(...cards)
}
const sabores = async () => {
    helperBuild('Sabores', 'o')

    const sabores = await sabor()
    const cards = []

    sabores.map(cardBuilder).forEach(item => {
        cards.push(item)
        item.addEventListener('click', productBuilder)
    })
    
    document.querySelector('.new').addEventListener('click', categoryBuilder)
    container.replaceChildren(...cards)
}
const contatos = async () => {
    helperBuild('Contatos', 'o')

    const clientes = await cliente()
    const cards = []

    clientes.map(cardBuilder).forEach(item => {
        cards.push(item)
        item.addEventListener('click', productBuilder)
    })
    
    container.replaceChildren(...cards)
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
    card.setAttribute('id', `${json.id}-${json.tipo}`)
    card.innerHTML = `${json.nome} <i class="fas fa-long-arrow-right"></i>`
    return card
}

document.querySelector('#exit').addEventListener('click', () => {
    localStorage.removeItem('admId')
})

document.querySelectorAll('[name="choices"]').forEach(item => {
    item.addEventListener('change', checker)
})
