import base from './helpers/baseUrl.js'

const categoriaPizza = async () => {
    const url = base + 'pizza/categorias'
    const res = await fetch(url)

    const categorias = await res.json()
    return categorias.categorias
}
const categoriaBebida = async () => {
    const url = base + 'bebidas/categorias'
    const res = await fetch(url)

    const categorias = await res.json()
    return categorias.categorias
}
export {
    categoriaPizza,
    categoriaBebida
}