/********************************************
* Objetivo: Arquivo responsável pela manipulação de dados com o BD (Insert, Select, Delete) da tabela intemediaria entre promocao e servico
ção
* Autor: Gyovanne Martins e Rafael Oliveira 
* Data criação: 21/11/2022
* Versão: 1.0
********************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const findPromocaoServicos = async function (id) {
    let sql = `select * from tbl_Promocao_Servico where id = ${id}`

    try {
        const rsPromocaos = await prisma.$queryRawUnsafe(sql)

        if (rsPromocaos.length > 0)
            return rsPromocaos
        else
            return false
    }
    catch (error) {
        return false
    }
}

const insertPromocaoServicos = async function (json){
    try {
        let PromocaoProduto = json

        let sql = `insert into tbl_Promocao_Servico(id_Servico, id_Promocao) values(${PromocaoProduto.servico}, ${PromocaoProduto.promocao})`
        
        const result = await prisma.$executeRawUnsafe(sql)    

        if(result){
            return true
        } else {
            return false
        }
    } catch(error) {
        console.log(error);
        return false
    }
} 

const selectLastId_Servicos = async function(){

    let sql = `select id from tbl_Promocao_Servico order by id desc limit 1`

    try{    
        const rsPromocao = await prisma.$queryRawUnsafe(sql)
        if(rsPromocao.length > 0) {
            return rsPromocao[0].id
        } else {
            return false
        }
    } catch(error){
       
        return false
    }
}

const deletePromocaoServicos = async function (id){

    let sql = `delete from tbl_Promocao_Servico where id = ${id}`

    try{    
        const result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } 
    catch{
        return false
    }
}

const selectAllPromocoesServicos = async function () {
    try {
        const rsServicos = await prisma.$queryRaw`select * from tbl_Promocao_Servico`;
    
        if (rsServicos.length > 0)
            return rsServicos
        else 
            return false
    } 
    catch (error) {
        return false
    }
}

module.exports = {
    insertPromocaoServicos,
    selectLastId_Servicos,
    deletePromocaoServicos,
    findPromocaoServicos,
    selectAllPromocoesServicos
}
