/********************************************
* Objetivo: Arquivo responsável pela manipulação de dados com o BD (Insert, Select, Delete) da tabela intemediaria entre promocao e pizza
ção
* Autor: Gyovanne Martins e Rafael Oliveira
* Data criação: 21/11/2022
* Versão: 1.0
********************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const findPromocaoPizza = async function (id) {
    let sql = `select * from tbl_Promocao_Pizza where id = ${id}`

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

const insertPromocaoPizza = async function (json){
    try {
        let PromocaoProduto = json

        let sql = `insert into tbl_Promocao_Pizza(id_Pizza, id_Promocao) values(${PromocaoProduto.pizza}, ${PromocaoProduto.promocao})`
        
        const result = await prisma.$executeRawUnsafe(sql)    


        if(result){
            let precoPizza = await prisma.$queryRaw`select ROUND(tbl_pizza.Preco, 2) as preco from tbl_pizza where id = ${PromocaoProduto.pizza}` 
            let desconto = await prisma.$queryRaw`select desconto from tbl_promocao where id = ${PromocaoProduto.promocao}` 

            let descontPizza = (precoPizza[0].preco*desconto[0].desconto)/100

            const { putPreco } =  require('../DAO/pizza.js')

            const descontoTotal = await putPreco(precoPizza[0].preco, descontPizza, PromocaoProduto.pizza )
            console.log(descontoTotal);
            if (descontoTotal) {
                return true
            } else
                return false
        } else {
            return false
        }
    } catch(error) {
        return false
    }
}

const desconto = async function(){
    let precoPizza = await prisma.$queryRaw`select ROUND(tbl_pizza.Preco, 2) as preco from tbl_pizza where id = ${PromocaoProduto.pizza}` 
    let desconto = await prisma.$queryRaw`select desconto from tbl_promocao where id = ${PromocaoProduto.promocao}` 

    let descontPizza = (precoPizza[0].preco*desconto[0].desconto)/100

    const { putPreco } =  require('../DAO/pizza.js')

    const descontoTotal = await putPreco(precoPizza[0].preco, descontPizza, PromocaoProduto.pizza )
    console.log(descontoTotal);
}

const selectLastId_Pizza = async function(){

    let sql = `select id from tbl_Promocao_Pizza order by id desc limit 1`

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

const deletePromocaoPizza = async function (id){

    let sql = `delete from tbl_Promocao_Pizza where id = ${id}`

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

const selectAllPromocoesPizzas = async function () {
    try {
        const rsServicos = await prisma.$queryRaw`select * from tbl_Promocao_Pizza`;
    
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
    insertPromocaoPizza,
    selectLastId_Pizza,
    deletePromocaoPizza,
    findPromocaoPizza,
    selectAllPromocoesPizzas
};
