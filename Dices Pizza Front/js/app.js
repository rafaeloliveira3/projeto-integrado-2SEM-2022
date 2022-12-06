'use strict'

import { pizzas, favoritas, searchPizza } from './fetchs/pizzaFetch.js'
import { bebidas, searchBebidas } from './fetchs/drinkFetch.js'
import { services } from './fetchs/servicesFetch.js'
import { clientController } from './modules/submit.js'

const load = async () => {
    const cardapioContainer = document.querySelector('#cardapio-cards')
    const favoritasContainer = document.querySelector('#favoritas-cards')
    const bebidasContainer = document.querySelector('#bebidas-cards')

    const pizza = await pizzas()
    const pizzaFixed = pizza.filter((item, index, self) => index === self.findIndex((t => (
        t.id === item.id
    ))))

    const pizzasCards = pizzaFixed.map(cardBuilder)
    cardapioContainer.replaceChildren(...pizzasCards)
    

    const pizzasFavoritas = await favoritas()
    const favoritasFixed = pizzasFavoritas.filter((item, index, self) => index === self.findIndex((t => (
        t.id === item.id
    ))))

    const favoritasCard = favoritasFixed.map(cardBuilder)
    favoritasContainer.replaceChildren(...favoritasCard)


    const bebida = await bebidas()
    const bebidasFixed = bebida.filter((item, index, self) => index === self.findIndex((t => (
        t.id === item.id
    ))))

    const bebidasCard = bebidasFixed.map(bebidaCardBuilder)
    bebidasContainer.replaceChildren(...bebidasCard)

    servicos()
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
const bebidaCardBuilder = (json) => {
    const card = document.createElement('pizza-card')
    card.nome = json.Nome
    card.ingredientes = json.Volume
    card.preco = json.Preco.toFixed(2)
    if (json.Imagem = 'undefined') {
        json.Imagem = 'https://imagensemoldes.com.br/wp-content/uploads/2020/05/Pet-2-Litros-Coca-Cola-PNG.png'
    }
    card.imgurl = json.Imagem

    return card
}
const servicesCardBuilder = (json) => {
    const card = document.createElement('div')
    card.classList.add('service-card')
    if (json.Imagem == 'undefined' || json.Imagem == null) {
        json.Imagem = 'https://blog.dipratos.com.br/wp-content/uploads/2021/08/como-montar-um-delivery-restaurante.jpg'
    }
    card.innerHTML = `
    <h2>${json.Nome}</h2>
    <p>${json.Descricao}</p>
    <img src="${json.Imagem}" alt="Imagem do Servico">
    `
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

const servicos = async () => {
    const servicesContainer = document.querySelector('.servico-container')
    const servicos = await services()

    const servicesCards = servicos.map(servicesCardBuilder)
    servicesContainer.replaceChildren(...servicesCards)
}

const searchPizzas = async (prompt) => {
    const cardapioContainer = document.querySelector('#cardapio-cards')

    const pizzas = await searchPizza(prompt)

    if (pizzas == 404) {
        cardapioContainer.innerHTML = '<h2>Não foram encontradas pizzas com esse nome...</h2>'
    }
    else {
        const pizzaFixed = pizzas.filter((item, index, self) => index === self.findIndex((t => (
            t.id === item.id
        ))))

        const pizzasCards = pizzaFixed.map(cardBuilder)
        cardapioContainer.replaceChildren(...pizzasCards)
    }
}
const searchDrink = async (prompt) => {
    const bebidasContainer = document.querySelector('#bebidas-cards')

    const bebida = await searchBebidas(prompt)

    if (bebida == 404) {
        bebidasContainer.innerHTML = '<h2>Não foram encontradas bebidas com esse nome...</h2>'
    }
    else {
        const bebidasFixed = bebida.filter((item, index, self) => index === self.findIndex((t => (
            t.id === item.id
        ))))

        const bebidaCards = bebidasFixed.map(bebidaCardBuilder)
        console.log(bebidaCards);
        bebidasContainer.replaceChildren(...bebidaCards)
    }
}

const keyChecker = (e) => {
    const id = e.currentTarget.id

    const input = document.querySelector(`#${id}`).value

    if (e.key == 'Enter' && input != '' && id.includes('pizza')) {
        console.log('pizza');
        searchPizzas(input)
    }
    else if (e.key == 'Enter' && input != '' && id.includes('drink')) {
        console.log('bebida');
        searchDrink(input)
    }
    else if (e.key == 'Enter' && input == '') {
        console.log('tudo');
        load()
    }
}

document.querySelector('#cardapio-button').addEventListener('click', removeHide)
document.querySelector('#favoritas-button').addEventListener('click', removeHide)
document.querySelector('#bebidas-button').addEventListener('click', removeHide)

document.querySelector('#cardapio-voltar').addEventListener('click', putHide)
document.querySelector('#favoritas-voltar').addEventListener('click', putHide)
document.querySelector('#bebidas-voltar').addEventListener('click', putHide)

document.querySelector('#pizza-search').addEventListener('keypress', keyChecker)
document.querySelector('#drink-search').addEventListener('keypress', keyChecker)

document.querySelector('#submit').addEventListener('submit', clientController)

load()