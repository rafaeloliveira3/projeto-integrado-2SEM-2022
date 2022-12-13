const container = document.getElementById('container')
const helpers = document.getElementById('helpers')
import { categoriaPizza, categoriaBebida, categorySave } from "../fetchs/categoryFetch.js"
import { bebidaId, saveProductDrink, editDrink, deleteDrink} from "../fetchs/drinkFetch.js"
import { pizzaId, sabor, saveProductPizza, deletePizza, editPizza } from "../fetchs/pizzaFetch.js"

const productBuilder = async (e) => {
    let element = false
    const id = e.currentTarget.id
    let classes
    if (id) {
        classes = document.getElementById(id).classList
        element = true
    }

    helpers.innerHTML = ''

    let categorias = await categoriaPizza()
    const sabores = await sabor()

    const selectItemsCategoria = categorias.map(json => {
        const opt = document.createElement('option')

        opt.value = json.id
        opt.textContent = json.nome

        return opt
    })
    const selectItemsSabores = sabores.map(json => {
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
            <input type="text" placeholder="Nome" id="nome" required>
            <input type="number" placeholder="Preço" step="0.01" id="preco" required/>
            <select name="categorias-produtos" id="categorias-produtos" required>

            </select>
            <textarea name="especificacao" id="especificacao" placeholder="Ingredientes"></textarea>
        </div>
        <div class="input-opt">
            <input type="file" id="image-input" accept="image/*">
            <label for="image-input"><i class="fa-solid fa-plus"></i></label>
            <select name="sabores-pizza" id="sabor" required>
            
            </select>
        </div>
    </div>
    <div class="save">
        <button type="reset" class="button-red" id="excluir">EXCLUIR</button>
        <button type="submit" class="button-pink" id="save">SALVAR</button>
    </div>
    </form>
    `

    const select = document.getElementById('tipo-produto')
    document.getElementById('categorias-produtos').replaceChildren(...selectItemsCategoria)
    document.getElementById('sabor').replaceChildren(...selectItemsSabores)

    select.addEventListener('change', async () => {
        document.getElementById('sabor').style.display = 'Block'
        document.getElementById('especificacao').placeholder = 'Ingredientes'
        if (select.value == 1) {
            categorias = await categoriaPizza()
            const selectItems = categorias.map(json => {
                const opt = document.createElement('option')
        
                opt.value = json.id
                opt.textContent = json.nome
        
                return opt
            })

            document.getElementById('categorias-produtos').replaceChildren(...selectItems)

            document.getElementById('save').removeEventListener('click', saveProductDrink)
            document.getElementById('save').addEventListener('click', saveProductPizza)
        }
        else {
            document.getElementById('sabor').style.display = 'None'
            document.getElementById('especificacao').placeholder = 'Volume'
            categorias = await categoriaBebida()
            const selectItems = categorias.map(json => {
                const opt = document.createElement('option')
        
                opt.value = json.id
                opt.textContent = json.nome
        
                return opt
            })

            document.getElementById('categorias-produtos').replaceChildren(...selectItems)

            document.getElementById('save').removeEventListener('click', saveProductPizza)
            document.getElementById('save').addEventListener('click', saveProductDrink)
        }
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

        document.getElementById('excluir').addEventListener('click', () => {
            deleteDrink(idFixed)
        })
        document.getElementById('save').removeEventListener('click', saveProductDrink)
        document.getElementById('save').addEventListener('click', () => {
            editDrink(idFixed)
        })

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

        document.getElementById('excluir').addEventListener('click', () => {
            deletePizza(idFixed)
        })
        document.getElementById('save').removeEventListener('click', saveProductPizza)
        document.getElementById('save').addEventListener('click', () => {
            editPizza(idFixed)
        })

        categorias.replaceChildren(...selectItems)
        nome.value = pizza.nome_pizza
        preco.value = pizza.Preco.toFixed(2)
        especificacao.textContent = pizza.Descricao
        select.value = 1
    }
}

const categoryBuilder = async (e) => {
    let element = false
    const id = e.currentTarget.id
    let classes

    if (id) {
        classes = document.getElementById(id).classList
        element = true
    }

    helpers.innerHTML = ''

    container.innerHTML = `
    <form class="inputs-container">
    <div class="inputs">
        <div class="inputs-text">
            <select name="tipo-produto" id="tipo-produto">
                <option value="1">Pizza</option>
                <option value="2">Bebida</option>
            </select>
            <input type="text" placeholder="Nome" id="nome" required>
            <textarea name="especificacao" id="especificacao" placeholder="Descrição"></textarea>
        </div>
    </div>
    <div class="save">
        <button type="reset" class="button-red" id="excluir">EXCLUIR</button>
        <button type="submit" class="button-pink" id="save">SALVAR</button>
    </div>
    </form>`
    document.getElementById('save').addEventListener('click', categorySave)
    if (element) {
        categoryFill(id, classes)
    }
}

const categoryFill = (id, classes) => {
    console.log('suma');
}

const helperBuild = (string, pro) => {
    let singular = string.slice(0, -1)

    if (string == 'Sabores') {
        singular = 'Sabor'
    }
    helpers.innerHTML = `
    <button class="button-pink new">Cadastrar nov${pro} ${singular}</button>
    <input type="text" placeholder="Pesquise por ${string}">
    `
}
export {
    productBuilder,
    helperBuild,
    categoryBuilder
}