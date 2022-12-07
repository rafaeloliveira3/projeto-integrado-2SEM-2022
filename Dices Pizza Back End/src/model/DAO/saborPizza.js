/********************************************
* Objetivo: Arquivo responsável pela manipulação de dados com o BD (Insert, Update, Select, Delete) da tabela intermediária de sabores de pizzas
* Autor: Gyovanne Martins Rafael Oliveira
* Data criação: 30/11/2022
* Versão: 1.0
********************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const selectAllSabores = async function () {
    try {
        const rsSabor = await prisma.$queryRaw`select * from tbl_Sabor`;
        if (rsSabor.length > 0)
            return rsSabor
        else 
            return false
    } 
    catch (error) {
        return false
    }
}
 
const findSabor = async function (id) {
    let sql = `select * from tbl_Sabor where id = ${id}`

    try {
        const rsSabor = await prisma.$queryRawUnsafe(sql)

        if (rsSabor.length > 0)
            return rsSabor
        else
            return false
    }
    catch (error) {
        return false
    }
}

const findSaborName = async function (name) {

    let sql = `select * from tbl_Sabor where Nome like '%${name}%'`

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

const putSabor = async function (json){

    try {
        let sql = `update tbl_Sabor set
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
        return false
    }
}

const removeSabor = async function (id){

    let sql = `delete tbl_Sabor, tbl_Pizza_Sabor
                    from tbl_Sabor             
                        left join tbl_Pizza_Sabor
                            on tbl_Sabor.id = tbl_Pizza_Sabor.id_Sabor
                  where tbl_Sabor.id = ${id}`

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

const createSabor = async function (json){
    try {
        let sql = `insert into tbl_Sabor(Nome, Descricao) values('${json.nome}', '${json.descricao}')`
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

    let sql = `select id from tbl_Sabor order by id desc limit 1`

    try{    
        const rsSabor = await prisma.$queryRawUnsafe(sql)
        if(rsSabor.length > 0) {
            return rsSabor[0].id
        } else {
            return false
        }
    } catch{ 
        return false
    }
}

module.exports = {
    selectAllSabores,
    findSabor,
    putSabor,
    removeSabor,
    createSabor,
    selectLastId,
    findSaborName
}