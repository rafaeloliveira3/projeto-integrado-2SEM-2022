/********************************************
* Objetivo: Arquivo responsável pela manipulação de dados com o BD (Insert, Select, Delete) da tabela intemediaria entre promocao e bebida
ção
* Autor: Gyovanne Martins e Rafael Oliveira
* Data criação: 21/11/2022
* Versão: 1.0
********************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const findPromocaoBebida = async function (id) {
    let sql = `select * from tbl_Promocao_Bebida where id = ${id}`

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

const insertPromocaoBebida = async function (json){
    try {
        let PromocaoProduto = json

        let sql = `insert into tbl_Promocao_Bebida(id_Bebida, id_Promocao) values(${PromocaoProduto.bebida}, ${PromocaoProduto.promocao})`
        
        const result = await prisma.$executeRawUnsafe(sql)    

        let formato = await prisma.$queryRaw`select tbl_formato.nome as formatoPromocao from tbl_formato inner join tbl_promocao on tbl_Formato.id = tbl_promocao.id_Formato_Promocao where tbl_Promocao.id = ${PromocaoProduto.promocao}` 

        if(result){
            if(formato[0]. formatoPromocao == 'combo' || formato[0]. formatoPromocao == 'Combo'){ 

                return true 
        
            } else{ 
            let precoBebida = await prisma.$queryRaw`select ROUND(tbl_bebida.Preco, 2) as preco from tbl_bebida where id = ${PromocaoProduto.bebida}` 
            let desconto = await prisma.$queryRaw`select desconto from tbl_promocao where id = ${PromocaoProduto.promocao}` 

            let descontbebida = (precoBebida[0].preco*desconto[0].desconto)/100

            const { putPreco } =  require('../DAO/bebidas.js')
                console.log(descontbebida);
            const descontoTotal = await putPreco(precoBebida[0].preco, descontbebida, PromocaoProduto.bebida )

                if (descontoTotal) {
                    return true
                } else {
                    return false
                }
            }
        }  else {
            return false
        }
    } catch(error) {
        console.log(error);
        return false
    }
}

const selectLastId_Bebida = async function(){

    let sql = `select id from tbl_Promocao_Bebida order by id desc limit 1`

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

const deletePromocaoBebida = async function (id){

    let sql = `delete from tbl_Promocao_Bebida where id = ${id}`

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

const selectAllPromocoesBebidas = async function () {
    try {
        const rsServicos = await prisma.$queryRaw`select * from tbl_Promocao_Bebida`;
    
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
    insertPromocaoBebida,
    selectLastId_Bebida,
    deletePromocaoBebida,
    findPromocaoBebida,
    selectAllPromocoesBebidas
}