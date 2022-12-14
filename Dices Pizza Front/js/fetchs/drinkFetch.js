import base from './helpers/baseUrl.js'

const bebidas = async () => {
    const url = base + 'bebidas'
    const res = await fetch(url)
    
    const bebida = await res.json()

    let result = bebida.drinks
    result.map(item => item.tipo = 'bebida')

    return result
}

const categoriaPizza = async () => {
    const url = base + 'categoriaPizza'
    const res = await fetch(url)
    
    const bebida = await res.json()

    let result = bebida.drinks
    result.map(item => item.tipo = 'bebida')

    return result
}


const searchBebidas = async (drinkName) => {
    const prompt = drinkName.replace(' ', '%20')
    const url = base + `drink/?bebida=${prompt}`
    const res = await fetch(url)
    
    if (res.status == 404) {
        return res.status
    }
    const bebida = await res.json()
    return bebida.drink
}
const bebidaId = async (id) => {
    const url = base + `bebida/${id}`
    const res = await fetch(url)

    const bebida = await res.json()
    return bebida.drink[0]
}

const saveProductDrink = async () => {
    const json = {
        nome : document.querySelector('#nome').value,
        preco : document.querySelector('#preco').value,
        volume: document.querySelector('#especificacao').value,
        especificidade : document.querySelector('#categorias-produtos').value
    }
    const url = base + `admin/bebida`
    const res = await fetch(url, {
        method : 'POST',
        headers : {'Content-type' : 'application/json'},
        body : JSON.stringify(json)
    })

    return {status : await res.status(), res : await res.json()}
}

const editDrink = async (id) => {
    const json = {
        nome : document.querySelector('#nome').value,
        preco : document.querySelector('#preco').value,
        volume: document.querySelector('#especificacao').value,
        especificidade : document.querySelector('#categorias-produtos').value
    }
    const url = base + `admin/bebida/${id}`
    const res = await fetch(url, {
        method : 'PUT',
        headers : {'Content-type' : 'application/json'},
        body : JSON.stringify(json)
    })

    return res.status
}

const deleteDrink = async (id) => {
    const url = base + `admin/bebida/${id}`
    const res = await fetch(url, {
        method : 'DELETE'
    })

    const status = res.status
    if (status == 200) {
        alert('Item deletado com Sucesso')
    }
}
export {
    bebidas,
    searchBebidas,
    bebidaId,
    categoriaPizza,
    saveProductDrink,
    editDrink,
    deleteDrink
}