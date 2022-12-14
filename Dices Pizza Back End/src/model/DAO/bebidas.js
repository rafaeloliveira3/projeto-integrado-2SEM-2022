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
            let sql = `select tbl_Bebida.id, tbl_Bebida.nome, ROUND(tbl_Bebida.preco, 2) as preco, tbl_Bebida.imagem, tbl_Bebida.volume, tbl_Especificidade_Da_Bebida.nome as especificidade
                                                            from tbl_Bebida
                                                                inner join tbl_Especificidade_Da_Bebida
                                                                    on tbl_Especificidade_Da_Bebida.id = tbl_Bebida.id_Especificidade_Da_Bebida;`;
                                                                    
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

const findBebidaByName = async function (name) {
    let sql = `select tbl_Bebida.id, tbl_Bebida.nome, ROUND(tbl_Bebida.preco, 2) as preco, tbl_Bebida.imagem, tbl_Bebida.volume, tbl_Especificidade_Da_Bebida.nome as especificidade
                            from tbl_Bebida     
                                inner join tbl_Especificidade_Da_Bebida
                                    on tbl_Especificidade_Da_Bebida.id = tbl_Bebida.id_Especificidade_Da_Bebida;
                where tbl_Bebida.nome like '%${name}%'`
                
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

const findBebidaName = async function (name) {

    let sql = `select id, Nome as nome from tbl_Bebida where nome like '%${name}%'`

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

const updateBebida = async function (json){

    try {
        let sql = `update tbl_Bebida set
            Nome = '${json.nome}', 
            preco = '${json.preco}',
            Imagem = '${json.imagem}',
            Volume = '${json.volume}',
            id_Especificidade_Da_Bebida = ${json.especificidade}
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

        let sql = `insert into tbl_Bebida(Nome, Volume, Imagem, id_Especificidade_Da_Bebida, Preco) values('${bebida.nome}', '${bebida.volume}', '${bebida.imagem}', ${bebida.especificidade},'${bebida.preco}')`

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

const putPreco = async function (precoNormal, descontado, id) {

    let sql = `update tbl_Bebida set 
                    Preco = '${precoNormal}' - '${descontado}'
                where id = ${id}` 
    try {
        const result = await prisma.$executeRawUnsafe(sql)
        if(result)
            return true
        else
            return false
    } 
    catch(error) {
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
    findBebidaByName,
    findBebidaName,
    putPreco
}