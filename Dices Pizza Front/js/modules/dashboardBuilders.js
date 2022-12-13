const container = document.getElementById('container')
const helpers = document.getElementById('helpers')
import { categoriaPizza, categoriaBebida } from "../fetchs/categoryFetch.js"
import { bebidaId } from "../fetchs/drinkFetch.js"
import { pizzaId } from "../fetchs/pizzaFetch.js"

const productBuilder = async (e) => {

    let element = false
    const id = e.currentTarget.id
    const classes = document.getElementById(id).classList

    if (id) {
        element = true
    }

    helpers.innerHTML = ''

    const categorias = await categoriaPizza()

    const selectItems = categorias.map(json => {
        const opt = document.createElement('option')

        opt.value = json.id
        opt.textContent = json.nome

        return opt
    })

    container.innerHTML = `
    <form class="inputs-container">
    <div class="inputs">
        <div class="inputs-text">
            <select name="tipo-produto" id="tipo-produto">
                <option value="1">Pizza</option>
                <option value="2">Bebida</option>
            </select>
            <input type="text" placeholder="Nome" id="nome">
            <input type="number" placeholder="Preço" step="0.01" id="preco"/>
            <select name="categorias-produtos" id="categorias-produtos">

            </select>
            <textarea name="especificacao" id="especificacao" placeholder="Ingredientes"></textarea>
        </div>
        <div class="input-opt">
            <input type="file" id="image-input" accept="image/*">
            <label for="image-input"><i class="fa-solid fa-plus"></i></label>
            <textarea name="descricao" id="descricao" placeholder="Descrição"></textarea>
        </div>
    </div>
    <div class="save">
        <button type="reset" class="button-red">EXCLUIR</button>
        <button type="submit" class="button-pink">SALVAR</button>
    </div>
    </form>
    `

    const select = document.getElementById('tipo-produto')
    document.getElementById('categorias-produtos').replaceChildren(...selectItems)
    select.addEventListener('change', () => {
        if (select.value == 1) 
            document.getElementById('especificacao').placeholder = 'Ingredientes'
        else
            document.getElementById('especificacao').placeholder = 'Volume'
    })
    if (element) {
        fill(id, classes)
    }
}

const fill = async (id, classes) => {
    let idFixed = id.split('-')[0]
    const select = document.querySelector('#tipo-produto')
    const nome = document.querySelector('#nome')
    const preco = document.querySelector('#preco')
    const especificacao = document.querySelector('#especificacao')
    const descricao = document.querySelector('#descricao')
    const categorias = document.querySelector('#categorias-produtos')

    if (classes[1].includes('bebida')) {
        const categoria = await categoriaBebida()
        const selectItems = categoria.map(json => {
            const opt = document.createElement('option')
    
            opt.value = json.id
            opt.textContent = json.nome
    
            return opt
        })
        const bebida = await bebidaId(idFixed)

        categorias.replaceChildren(...selectItems)
        nome.value = bebida.nome
        preco.value = bebida.preco.toFixed(2)
        especificacao.textContent = bebida.volume
        select.value = 2
    }
    else if (classes[1].includes('pizza')) {
        const categoria = await categoriaPizza()
        const selectItems = categoria.map(json => {
            const opt = document.createElement('option')
    
            opt.value = json.id
            opt.textContent = json.nome
    
            return opt
        })
        const pizza = await pizzaId(idFixed)
        console.log(pizza);
        categorias.replaceChildren(...selectItems)
        nome.value = pizza.nome_pizza
        preco.value = pizza.Preco.toFixed(2)
        especificacao.textContent = pizza.Ingedientes
        select.value = 2
    }
}

const categoryBuilder = async () => {
    
}
const helperBuild = (string) => {
    const singular = string.split('s')

    helpers.innerHTML = `
    <button class="button-pink">Cadastrar novo ${singular[0]}</button>
    <input type="text" placeholder="Pesquise por ${string}">
    `
}
export {
    productBuilder,
    helperBuild
}