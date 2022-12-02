/********************************************
* Objetivo: Arquivo responsável pela manipulação de dados com o BD (Insert, Update, Select, Delete) da tabela de Bebidas
* Autor: Gyovanne Martins Rafael Oliveira
* Data criação: 28/11/2022
* Versão: 1.0
********************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const selectAllBebidas = async function () {
    try {
        const rsBebidas = await prisma.$queryRaw `select * from tbl_Bebida`;
        console.log(rsBebidas);
        if (rsBebidas.length > 0)
            return rsBebidas
        else 
            return false
    } 
    catch (error) {
        return false
    }
}

const findBebidaByName = async function (name) {
    let sql = `select id, Nome
                from tbl_Bebida
                where nome like '%${name}%'`
                
    try {
        const rsBebida = await prisma.$queryRawUnsafe(sql)
        
        if(rsBebida.length > 0) {
            return rsBebida
        } 
        else {
            return false
        }
    }
    catch (error) {
        return false
    }
}

const findBebida = async function (id) {
    let sql = `select * from tbl_Bebida where id = ${id}`

    try {
        const rsBebidas = await prisma.$queryRawUnsafe(sql)

        if (rsBebidas.length > 0)
            return rsBebidas
        else
            return false
    }
    catch (error) {
        return false
    }
}

const updateBebida = async function (json){

    try {

        let sql = `update tbl_Bebida set
            Nome = '${json.nome}', 
            preco = '${json.preco}',
            Imagem = '${json.imagem}',
            Volume = '${json.volume}',
            Especificidade_Da_Bebida = '${json.especificidade}'
        where id = '${json.id}';`

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

const deleteBebida = async function (id){

    let sql = `delete from tbl_Bebida where id = ${id}`

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

const insertBebida = async function (json){
    try {
        let bebida = json

        let sql = `insert into tbl_Bebida(Nome, Volume, Imagem, id_Especificidade_Da_Bebida, Preco) values('${bebida.nome}', '${bebida.volume}', '${bebida.imagem}', ${bebida.especificidade}, ${preco.bebida})`

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

    let sql = `select id from tbl_Bebida order by id desc limit 1`

    try{    
        const rsBebida = await prisma.$queryRawUnsafe(sql)

        if(rsBebida.length > 0) {
            return rsBebida[0].id
        } else {
            return false
        }
    } catch{ 
        return false
    }
}

module.exports = {
    selectAllBebidas, 
    insertBebida, 
    updateBebida, 
    findBebida,
    deleteBebida,
    selectLastId,
    findBebidaByName
}