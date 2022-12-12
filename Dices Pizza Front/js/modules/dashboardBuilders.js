const container = document.getElementById('container')
const helpers = document.getElementById('helpers')
import { categoriaPizza } from "../fetchs/categoryFetch.js"

const productBuilder = async () => {
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
            <input type="text" placeholder="Nome">
            <input type="number" placeholder="Preço" step="0.01"/>
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