/********************************************
* Objetivo: Arquivo responsável pela manipulação de dados com o BD (Insert, Select, Delete) da tabela intemediaria entre promocao e pizza pela categoria
ção
* Autor: Gyovanne Martins e Rafael Oliveira
* Data criação: 21/11/2022
* Versão: 1.0
********************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const findPromocaoPizzaCategoria = async function (id) {
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

const insertPizzasPorCategoria = async function (id, promocao){

    let sql = ` select tbl_Pizza.id 
                    from tbl_Pizza
                        inner join tbl_Categoria_Tipo_Pizza
                            on tbl_Pizza.id = tbl_Categoria_Tipo_Pizza.id_pizza
                        inner join tbl_Categoria_Tipo
                            on tbl_Categoria_Tipo.id = tbl_Categoria_Tipo_Pizza.id_Categoria_Tipo
                        where tbl_Categoria_Tipo.id = ${id}`
                        
    try {
        const rsPromocaos = await prisma.$queryRawUnsafe(sql)
        
        await rsPromocaos.forEach(async element => {

            let sql = `insert into tbl_Promocao_Pizza(id_Pizza, id_Promocao) values(${element.id}, ${promocao})`
            await prisma.$executeRawUnsafe(sql) 
            console.log(element);
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
 
const insertPromocaoPizzaCategoria = async function (json){
    try {
        let PromocaoProduto = json
        let categoria = PromocaoProduto.categoria
        let promocao = PromocaoProduto.promocao


        let pizzas = await insertPizzasPorCategoria(categoria, promocao)

        let validacao = await selectLastsId_Pizza(promocao)
        console.log(validacao);
        console.log(`${pizzas.length}n`);
        if(validacao == `${pizzas.length}n`){
            return true
        } else {
            return false
        }
    } catch(error) {
        return false
    }
}

const quantCriada = async function(idPromocao){
    let sql = `select COUNT(id) from tbl_Promocao_Pizza where id_promocao = ${idPromocao}`

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



const selectLastsId_Pizza = async function(idPromocao){

    let qtdePromocoes = await quantCriada(idPromocao)

    let sql = `select id from tbl_Promocao_Pizza order by id desc limit ${qtdePromocoes}`

    try{    
        const rsPromocao = await prisma.$queryRawUnsafe(sql)
        if(rsPromocao.length > 0) {
            return rsPromocao.id
        } else {
            return false
        }
    } catch(error){
        return false
    }
}

const deletePromocaoPizzaCategoria = async function (id){

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
    insertPromocaoPizzaCategoria,
    selectLastsId_Pizza,
    deletePromocaoPizzaCategoria,
    findPromocaoPizzaCategoria,
    selectAllPromocoesPizzas
}
