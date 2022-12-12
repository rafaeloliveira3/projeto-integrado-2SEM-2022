/********************************************
* Objetivo: Arquivo responsável pela manipulação de dados com o BD (Insert, Select, Delete) da tabela intemediaria entre promocao e pizza pelo sabor
ção
* Autor: Gyovanne Martins e Rafael Oliveira
* Data criação: 06/12/2022
* Versão: 1.0
********************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const findPromocaoPizzaSabor = async function (id) {
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

const insertPizzasPorSabor = async function (id, promocao){

    let sql = ` select tbl_Pizza.id as ids
                    from tbl_Pizza
                        inner join tbl_Pizza_Sabor
                            on tbl_Pizza.id = tbl_Pizza_Sabor.id_pizza
                        inner join tbl_Sabor
                            on tbl_Sabor.id = tbl_Pizza_Sabor.id_Sabor
                        where tbl_Sabor.id = ${id}`
                              
    try {

        const rsPromocaos = await prisma.$queryRawUnsafe(sql)

        await rsPromocaos.forEach(async element => {

            const { insertPromocaoPizza } =  require('../DAO/promocaoPizza')

            const json = {};
            json.pizza = element.ids;
            json.promocao = promocao;


            await insertPromocaoPizza(json)
        })

        if (rsPromocaos.length > 0)
            return rsPromocaos
        else
            return false
    }
    catch (error) {
        return false
    }
}

const quantCriada = async function(idPromocao, quantCriada){


    let sql = `select id_Pizza as ids from tbl_Promocao_Pizza where id_promocao = ${idPromocao} order by id desc limit ${quantCriada};`

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





const deletePromocaoPizzaSabor = async function (id){

    let sql = `delete from tbl_Promocao_Pizza where id_Promocao = ${id}`

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

const validacoes = async function (quantidade, promocoes){
    await quantidade.forEach(async Element => {
       let teste = await promocoes.indexOf(Element[0]) > -1
       if(!teste){
            return false
       }
    })
    return true
}

module.exports = {
    deletePromocaoPizzaSabor,
    findPromocaoPizzaSabor,
    selectAllPromocoesPizzas,
    insertPizzasPorSabor,
    quantCriada, validacoes
}
