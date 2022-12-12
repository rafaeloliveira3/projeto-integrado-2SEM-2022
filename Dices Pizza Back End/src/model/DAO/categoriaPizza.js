/********************************************
* Objetivo: Arquivo responsável pela manipulação de dados com o BD (Insert, Update, Select, Delete) da tabela intermediária de categorias e pizzas
* Autor: Gyovanne Martins Rafael Oliveira
* Data criação: 30/11/2022
* Versão: 1.0
********************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const selectAllCategorias = async function () {
    try {
        const rsCategoria = await prisma.$queryRaw`select * from tbl_Categoria_Tipo`;
        if (rsCategoria.length > 0)
            return rsCategoria
        else 
            return false
    } 
    catch (error) {
        return false
    }
}

const findCategorias = async function (id) {
    let sql = `select * from tbl_Categoria_Tipo where id = ${id}`

    try {
        const rsCategoria = await prisma.$queryRawUnsafe(sql)

        if (rsCategoria.length > 0)
            return rsCategoria
        else
            return false
    }
    catch (error) {
        return false
    }
}

const findCategoriaPizzaName = async function (name) {

    let sql = `select * from tbl_Categoria_Tipo where nome like '%${name}%'`

    try {
        const rsAdm = await prisma.$queryRawUnsafe(sql)

        if (rsAdm.length > 0)
            return rsAdm
        else
            return false
    }
    catch (error) {
        return false
    }
}

const putCategoria = async function (json){

    try {
        let sql = `update tbl_Categoria_Tipo set
            Nome = '${json.nome}',  
            Descricao = '${json.descricao}'
            where id = ${json.id};`

        const result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        } else {
            return false
        }
    } 
    catch(error) {
        console.log(error);
        return false
    }
}

const removeCategoria = async function (id){
    const { deletePizzas } = require('../../controller/controllerPizza.js')
    const ids = await selectPizzas(id)
    if (ids) {
        await Promise.all(ids.map(async (item) => {
            let id = item.id
            await deletePizzas(id)
        }))
    }

    let sql = `delete from tbl_Categoria_Tipo where id = ${id}`
    try{    
        const result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } 
    catch (error) {
        console.log(error);
        return false
    }
}

const createCategoria = async function (json){
    try {
        console.log(json);
        let sql = `insert into tbl_Categoria_Tipo(Nome, Descricao) values('${json.nome}', '${json.descricao}')`
        const result = await prisma.$executeRawUnsafe(sql)    

        if(result){
            return true
        } else {
            return false
        }
    } catch(error) {
        return false
    }
}

const selectLastId = async function(){

    let sql = `select id from tbl_Categoria_Tipo order by id desc limit 1`

    try{    
        const rsCategoria = await prisma.$queryRawUnsafe(sql)
        if(rsCategoria.length > 0) {
            return rsCategoria[0].id
        } else {
            return false
        }
    } catch{ 
        return false
    }
}
const selectPizzas = async function (id) {
    let sql = `select tbl_Pizza.id
                from tbl_Pizza
                    inner join tbl_Categoria_Tipo_Pizza
                        on tbl_Pizza.id = tbl_Categoria_Tipo_Pizza.id_Pizza
                    inner join tbl_Categoria_Tipo
                        on tbl_Categoria_Tipo.id = tbl_Categoria_Tipo_Pizza.id_Categoria_Tipo
                where tbl_Categoria_Tipo_Pizza.id_Categoria_Tipo = ${id}`

    try {
        const rsPizza = await prisma.$queryRawUnsafe(sql)
        if(rsPizza.length > 0)
            return rsPizza
        else 
            return false
    }
    catch (error) {
        return false
    }
}
module.exports = {
    selectAllCategorias,
    findCategorias,
    putCategoria,
    removeCategoria,
    createCategoria,
    selectLastId,
    findCategoriaPizzaName
}