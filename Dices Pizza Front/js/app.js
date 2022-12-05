'use strict'

import { pizzas } from './fetchs/pizzaFetch.js'

const load = async () => {
    const cardapio = document.querySelector('#cardapio-completo')
    const favoritas = document.querySelector('#favoritas')
    const bebidas = document.querySelector('#bebidas')

    const pizza = await pizzas()
    const fixed = pizza.filter((item, index, self) => index === self.findIndex((t => (
        t.id === item.id
    ))))

    const pizzasCards = fixed.map(cardBuilder)
    cardapio.append(...pizzasCards)
}

const cardBuilder = (json) => {
    const card = document.createElement('pizza-card')
    card.nome = json.nome
    card.ingredientes = json.descricao
    card.preco = json.preco.toFixed(2)
    if (json.imagem = 'undefined') {
        json.imagem = 'https://vassdeniss.github.io/pizzaclicker/images/transparentPizza.png'
    }
    card.imgurl = json.imagem

    return card
}
const removeHide = (e) => {
    const id = e.currentTarget.id
    let fixed

    if (id.includes('cardapio'))
        fixed = id.replace('button', 'completo')
    else
        fixed = id.replace('-button', '')

    document.getElementById(fixed).classList.remove('hide')
    document.querySelector('.cardapio-container').classList.add('hide')
}
const putHide = (e) => {
    const id = e.currentTarget.id
    let fixed

    if (id.includes('cardapio'))
        fixed = id.replace('voltar', 'completo')
    else 
        fixed = id.replace('-voltar', '')
        
    document.getElementById(fixed).classList.add('hide')
    document.querySelector('.cardapio-container').classList.remove('hide')
}

document.querySelector('#cardapio-button').addEventListener('click', removeHide)
document.querySelector('#favoritas-button').addEventListener('click', removeHide)
document.querySelector('#bebidas-button').addEventListener('click', removeHide)

document.querySelector('#cardapio-voltar').addEventListener('click', putHide)
document.querySelector('#favoritas-voltar').addEventListener('click', putHide)
document.querySelector('#bebidas-voltar').addEventListener('click', putHide)

load()