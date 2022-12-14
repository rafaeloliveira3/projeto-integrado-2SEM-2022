import base from './helpers/baseUrl.js'

const categoriaPizza = async () => {
    const url = base + 'pizza/categorias'
    const res = await fetch(url)

    const categorias = await res.json()

    let result = categorias.categorias
    result.map(item => item.tipo = 'pizza')

    return result
}

const searchCategoriaPizza = async(categoriaPizzaName) => {
    const prompt = categoriaPizzaName.replace(' ', '%20')
    const url = base + `pizza/categorias/?catPizza=${prompt}`
    const res = await fetch(url)

    if (res.status == 404) {
        return res.status
    }

    const categoriaPizza = await res.json()
    return categoriaPizza.categorias
}

const categoriaPizzaId = async(id) => {
    const url = base + `pizza/categorias/${id}`
    const res = await fetch(url)

    const categoriaPizza = await res.json() 
    return categoriaPizza.categorias[0]
}

const categoryUpdate = async (id) => {
    const product = document.querySelector('#tipo-produto').value
    let url
    let json = {
        nome : document.querySelector('#nome').value
    }

    if (product == 1) {
        url = base + `admin/pizza/categorias/${id}`
        json.descricao = document.querySelector('#especificacao').value
    }
    else {
        url = base + `admin/bebidas/categorias/${id}`
    }

    const res = await fetch(url, {
        method : 'PUT',
        headers : {'Content-type' : 'application/json'},
        body : JSON.stringify(json)
    })

    return {status : await res.status(), res : await res.json()}
}
const categoryDelete = async (id) => {
    const url = base + `admin/pizza/categorias/${id}`
    const res = await fetch(url, {
        method : 'DELETE',
    })

    const status = res.status
    if (status == 200) {
        alert('Item deletado com Sucesso')
    }
}

const categorySave = async () => {
    const product = document.querySelector('#tipo-produto').value
    let url
    let json = {
        nome : document.querySelector('#nome').value
    }

    if (product == 1) {
        url = base + 'admin/pizza/categorias'
        json.descricao = document.querySelector('#especificacao').value
    }
    else {
        url = base + 'admin/bebidas/categorias'
    }

    const res = await fetch(url, {
        method : 'POST',
        headers : {'Content-type' : 'application/json'},
        body : JSON.stringify(json)
    })

    return {status : await res.status(), res : await res.json()}
}

const categoriaBebida = async () => {
    const url = base + 'bebidas/categorias'
    const res = await fetch(url)

    const categorias = await res.json()

    let result = categorias.categorias
    result.map(item => item.tipo = 'bebida')

    return result
}

const categoriaBebidaId = async (id) => {
    const url = base + 'bebidas/categorias/'
    const res = await fetch(url)

    const categorias = await res.json()
    return categorias.categorias[0]
}


export {
    categoriaPizza,
    categoriaBebida,
    searchCategoriaPizza,
    categoriaPizzaId,
    categorySave,
    categoryUpdate,
    categoryDelete,
    categoriaBebidaId
}