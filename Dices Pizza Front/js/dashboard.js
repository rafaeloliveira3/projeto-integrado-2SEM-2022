'use strict'

import { bebidas, searchBebidas } from "./fetchs/drinkFetch.js"
import { pizzas, sabor, searchPizza } from "./fetchs/pizzaFetch.js"
import { categoriaPizza, categoriaBebida } from "./fetchs/categoryFetch.js"
import { administrador } from "./fetchs/admFetch.js"
import { cliente } from "./fetchs/clientFetch.js"
import { promotions } from "./fetchs/promotionFetch.js"
import { searchAdm } from "./fetchs/admFetch.js"
import { productBuilder, categoryBuilder, helperBuild, promotionBuilder, saborBuilder, helperBuildPromotion, promotionProducBuilder } from "./modules/dashboardBuilders.js"
import { promotionPizzaSave } from "./fetchs/promotionFetch.js"

const container = document.getElementById('container')

const load = async () => {
    const id = localStorage.getItem('admId')
    const adm = await searchAdm(id)

    document.querySelector('#adm-name').textContent = `${adm.nome}, Administrador`
}

load()

const produtos = async () => {
    helperBuild('Produtos', 'o')

    let pizza = await pizzas()
    let bebida = await bebidas()
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

    document.getElementById('search').addEventListener('keypress', async (e) => {
        const input = document.querySelector('#search').value  
        if (e.key == 'Enter' ) {
            if (input != '') {
                const searchCards = []
    
                pizza = await searchPizza(input)
                bebida = await searchBebidas(input)
                
                if (pizza != 404 && bebida != undefined) {
                    pizza.map(cardBuilder).forEach(item => {
                        item.classList.add('pizza')
                        searchCards.push(item)
                        item.addEventListener('click', productBuilder)
                    })
                }
                if (bebida != 404 && bebida != undefined) {
                    bebida.map(cardBuilder).forEach(item => {
                        item.classList.add('bebida')
                        searchCards.push(item)
                        item.addEventListener('click', productBuilder)
                    })
                }
                document.querySelector('.new').addEventListener('click', productBuilder)
                container.replaceChildren(...searchCards)
            }

            else produtos()
        }
    })
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
    
    document.querySelector('.new').addEventListener('click', saborBuilder)
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

const promocao = async () => {
    helperBuild('Promoções', 'a')

    const promocoes = await promotions()
    const cards = []

    promocoes.map(cardBuilderPromotion).forEach(item => {
        cards.push(item)
        item.addEventListener('click', productBuilder)
    })

    document.querySelector('.new').addEventListener('click', promotionBuilder)
    container.replaceChildren(...cards)
}

const promocaoProducts = async () => {
    helperBuildPromotion()

    const promocoes = await promotions()
    const cards = []

    promocoes.map(cardBuilderPromotion).forEach(item => {
        cards.push(item)
        item.addEventListener('click', productsChoose)
    })
    console.log(cards);

    container.replaceChildren(...cards)
}

const productsChoose = async (e) => {
    helperBuildPromotion()
    const id_promocao = e.currentTarget.id


    let singular = id_promocao.slice(0, -2)

    console.log(singular);
    let pizza = await pizzas()
    const cards = []

    pizza.map(cardBuilder).forEach(item => {
        item.idPromotion = id_promocao
        cards.push(item)
        item.addEventListener('click', promotionPizzaSave)
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
        case 'promocoes' :
            promocao()
            break
        case 'promocaoPromocoes' :
            promocaoProducts()
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

const cardBuilderPromotion = (json) => {
    const card = document.createElement('div')
    card.classList.add('card')
    card.setAttribute('id', `${json.id}-${json.id_formato}`)
    card.innerHTML = `${json.descricao_Promocao} <i class="fas fa-long-arrow-right"></i>`
    return card
}

document.querySelector('#exit').addEventListener('click', () => {
    localStorage.removeItem('admId')
})

document.querySelectorAll('[name="choices"]').forEach(item => {
    item.addEventListener('change', checker)
})

export {
    produtos,
    categorias
}