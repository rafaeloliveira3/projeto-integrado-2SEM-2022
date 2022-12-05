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

    cardapio.replaceChildren(...pizzasCards)
}

const cardBuilder = (json) => {
    const card = document.createElement('pizza-card')
    card.nome = json.nome
    card.ingredientes = json.descricao
    card.preco = json.preco.toFixed(2)
    if (json.imagem = 'undefined') {
        json.imagem = 'https://sp-ao.shortpixel.ai/client/q_glossy,ret_img/https://nonnabeni.com.br/wp-content/uploads/elementor/thumbs/PIZZA-1-ojygvkiy3e3jky5xzq9t3l9v9yuerfxke7nuyqdkho.png'
    }
    card.imgurl = json.imagem

    return card
} 
load()