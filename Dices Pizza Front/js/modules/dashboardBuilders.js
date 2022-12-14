const container = document.getElementById('container')
const helpers = document.getElementById('helpers')
import { categoriaPizza, categoriaBebida, categorySave, categoriaPizzaId, categoryUpdate, categoryDelete, categoriaBebidaId} from "../fetchs/categoryFetch.js"
import { bebidaId, saveProductDrink, editDrink, deleteDrink } from "../fetchs/drinkFetch.js"
import { pizzaId, sabor, saveProductPizza, deletePizza, editPizza, saveSabor } from "../fetchs/pizzaFetch.js"
import { produtos, categorias } from "../dashboard.js"
import { promotionSave, promotionPizzaSave } from "../fetchs/promotionFetch.js"

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

    document.getElementById('save').addEventListener('click', saveProductPizza)

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

        document.getElementById('excluir').addEventListener('click', async () => {
            await deleteDrink(idFixed)
            produtos()
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

        document.getElementById('excluir').addEventListener('click', async () => {
            await deletePizza(idFixed)
            produtos()
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
        classes = id.split('-')[1]
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

const promotionBuilder = async (e) => {
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
            <select name="formato" id="formato">
                <option value="1">Combo</option>
                <option value="2">Desconto</option>
            </select>
            <input type="text" placeholder="Desconto" id="desconto">
            <textarea name="descricao" id="descricao" placeholder="Descrição" required></textarea>
        </div>
    </div>
    <div class="save">
        <button type="reset" class="button-red" id="excluir">EXCLUIR</button>
        <button type="submit" class="button-pink" id="save">SALVAR</button>
    </div>
    </form>`
    document.getElementById('save').addEventListener('click', promotionSave)
    if (element) {
        promotionFill(id, classes)
    }
}
const promotionProducBuilder = async (e) => {
    let element = false
    const id = e.currentTarget.id
    const idPromotion = e.currentTarget.id
    let classes

    if (id) {
        classes = document.getElementById(id).classList
        element = true
    }

    helpers.innerHTML = ''

    container.innerHTML = `
    <form class="inputs-container">
    <div class="inputs">Salvar?</div>
    <div class="save">
        <button type="submit" class="button-pink" id="save">SALVAR</button>
    </div>
    </form>`
    
    document.getElementById('save').addEventListener('click', promotionPizzaSave)
    if (element) {
        promotionFill(id, classes)
    }
}

const saborBuilder = (e) => {
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
            <input type="text" placeholder="Nome" id="nome" required>
            <textarea name="especificacao" id="especificacao" placeholder="Descrição"></textarea>
        </div>
    </div>
    <div class="save">
        <button type="reset" class="button-red" id="excluir">EXCLUIR</button>
        <button type="submit" class="button-pink" id="save">SALVAR</button>
    </div>
    </form>`
    
    document.getElementById('save').addEventListener('click', saveSabor)

    if (element) {
        categoryFill(id, classes)
    }
}
const categoryFill = async (id, classes) => {
    let idFixed = id.split('-')[0]
    const select = document.querySelector('#tipo-produto')
    const nome = document.querySelector('#nome')
    const especificacao = document.querySelector('#especificacao')
    if (classes.includes('pizza')) {
        const categoria = await categoriaPizzaId(idFixed)

        select.value = 1
        nome.value = categoria.nome
        especificacao.textContent = categoria.descricao

        document.getElementById('save').removeEventListener('click', categorySave)
        document.getElementById('save').addEventListener('click', () => {
            categoryUpdate(idFixed)
        })
        document.getElementById('excluir').addEventListener('click', async () => {
            await categoryDelete(idFixed)
            categorias()
        })
    }
    else if (classes.includes('bebida')) {
        const categoria = await categoriaBebidaId(idFixed)
        select.value = 2
        nome.value = categoria.nome
        // TODO
    }
}

const promotionFill = (id, classes) => {
    console.log('suma');
}

const helperBuild = (string, pro) => {
    let singular = string.slice(0, -1)

    if (string == 'Sabores')
        singular = 'Sabor'
        
    if (string == 'Promoções')
        singular = 'Promoção'

    helpers.innerHTML = `
    <button class="button-pink new">Cadastrar nov${pro} ${singular}</button>
    <input type="text" id="search" placeholder="Pesquise por ${string}">
    `
}

const helperBuildPromotion = () => {
    helpers.innerHTML = `
    <h3>Escolha uma promoção</h3>
    `
}

const helperBuildChooseProduct = () => {
    helpers.innerHTML = `
    <h3>Escolha um produto</h3>
    `
}

export {
    productBuilder,
    helperBuild,
    categoryBuilder,
    promotionBuilder,
    helperBuildPromotion,
    saborBuilder,
    helperBuildChooseProduct,
    promotionProducBuilder
}