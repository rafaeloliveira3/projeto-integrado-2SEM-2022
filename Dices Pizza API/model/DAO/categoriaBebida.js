/********************************************
* Objetivo: Arquivo responsável pela manipulação de dados com o BD (Insert, Update, Select, Delete) da tabela de Categorias de Bebidas
* Autor: Gyovanne Martins Rafael Oliveira
* Data criação: 28/11/2022
* Versão: 1.0
********************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const selectAllCategorias = async function () {
    try {
        const rsCategoria = await prisma.$queryRaw`select * from tbl_Especificidade_Da_Bebida`;
        if (rsCategoria.length > 0)
            return rsCategoria
        else 
            return false
    } 
    catch (error) {
        return false
    }
}

const findCategoriaBebidaName = async function (name) {

    let sql = `select * from tbl_Especificidade_Da_Bebida where nome like '%${name}%'`

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

const findCategorias = async function (id) {
    let sql = `select * from tbl_Especificidade_Da_Bebida where id = ${id}`

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

const putCategoria = async function (json){

    try {
        let sql = `update tbl_Especificidade_Da_Bebida set
            Nome = '${json.nome}' where id = ${json.id};`

        const result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        } else {
            return false
        }
    } 
    catch(error) {
        return false
    }
}

const removeCategoria = async function (id){

    let sql = `delete from tbl_Especificidade_Da_Bebida where id = ${id}`

    try{    
        const result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } 
    catch {
        return false
    }
}

const createCategoria = async function (json){
    try {
        let servico = json

        let sql = `insert into tbl_Especificidade_Da_Bebida(Nome) values('${servico.nome}')`
        

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

    let sql = `select id from tbl_Especificidade_Da_Bebida order by id desc limit 1`

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

module.exports = {
    selectAllCategorias,
    findCategorias,
    putCategoria,
    removeCategoria,
    createCategoria,
    selectLastId,
    findCategoriaBebidaName
}