/********************************************
* Objetivo: Arquivo responsável pela manipulação de dados com o BD (Insert, Update, Select, Delete) da tabela de Pizzas
* Autor: Gyovanne Martins Rafael Oliveira
* Data criação: 28/11/2022
* Versão: 1.0
********************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const selectPrecoPizza = async function (id) {

    let sql = `select preco from tbl_pizza where id = ${id}`

    try {
        const rsPizza = await prisma.$queryRawUnsafe(sql)
        if (rsPizza.length > 0)
            return rsPizza
        else
            return false
    }
    catch (error) {
        return false
    }
}

const selectAllPizzas = async function () {

    let sql = `select tbl_pizza.id , tbl_Pizza.Nome as nome, ROUND(tbl_pizza.Preco, 2) as preco, tbl_Pizza.Descricao as descricao, tbl_pizza.favoritismo, tbl_pizza.imagem, 
                      tbl_Categoria_tipo.nome as categoria_Pizza, tbl_Categoria_Tipo.descricao as descricao_categoria_pizza,  
                      tbl_Sabor.nome as nome_Sabor_Pizza, tbl_Sabor.descricao as descricao_sabor_pizza
                      from tbl_pizza
	                left join tbl_Categoria_Tipo_Pizza
		                on tbl_pizza.id = tbl_Categoria_Tipo_Pizza.id_Pizza
                    left join tbl_Categoria_Tipo
		                on tbl_Categoria_Tipo.id = tbl_Categoria_Tipo_Pizza.id_Categoria_Tipo
	                left join tbl_Pizza_Sabor
		                on tbl_Pizza.id = tbl_Pizza_Sabor.id_Pizza
                    left join tbl_Sabor
		                on tbl_Sabor.id = tbl_Pizza_Sabor.id_Sabor
                        
                    order by tbl_Pizza.id`

    try {
        const rsPizza = await prisma.$queryRawUnsafe(sql)
        if (rsPizza.length > 0)
            return rsPizza
        else
            return false
    }
    catch (error) {
        return false
    }
}

const findPizzaByName = async function (name) {


    let sql = `select id, Nome 
                from tbl_pizza
                where nome like '%${name}%'`

    try {
        const rsPizza = await prisma.$queryRawUnsafe(sql)
        
        if(rsPizza.length > 0) {
            return rsPizza
        } 
        else {
            return false
        }
    }
    catch (error) {
        return false
    }
}

const findPizza = async function (id) {
    let sql = `select
                    tbl_Pizza.id, tbl_Pizza.Nome as nome_pizza, tbl_Pizza.Preco, tbl_Pizza.Descricao, tbl_Pizza.Imagem, tbl_Pizza.Favoritismo,
                    tbl_Sabor.Nome as sabor, tbl_Categoria_Tipo.nome as categoria
                from tbl_Pizza
                    left join tbl_Pizza_Sabor
                        on tbl_Pizza.id = tbl_Pizza_Sabor.id_Pizza
                    left join tbl_Sabor
                        on tbl_Sabor.id = tbl_Pizza_Sabor.id_Sabor
                        
                    left join tbl_Categoria_Tipo_Pizza
                        on tbl_Pizza.id = tbl_Categoria_Tipo_Pizza.id_Pizza
                    left join tbl_Categoria_Tipo
                        on tbl_Categoria_Tipo.id = tbl_Categoria_Tipo_Pizza.id_Categoria_Tipo
                where tbl_Pizza.id = ${id}`

                
    try {
        const rsPizza = await prisma.$queryRawUnsafe(sql)
        
        if(rsPizza.length > 0) {
            return rsPizza
        } 
        else {
            return false
        }
    }
    catch (error) {
        return false
    }
}

const findPizzaName = async function (name) {

    let sql = `select id, Nome as nome, Preco as preco, Descricao as descricao, Imagem as imagem from tbl_Pizza where nome like '%${name}%'`

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

const createPizza = async function (json) {

    const { createPizzaCategoria, createPizzaSabor } = require('./pizzaConfig.js')

    let sql = `insert into tbl_Pizza (Nome, Preco, Descricao, Imagem, Favoritismo)
                values(
                    '${json.nome}',
                    '${json.preco}',
                    '${json.descricao}',
                    '${json.img}',
                    '${json.favorito}'
                )`

    try {
        const result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            json.id = await selectLastId()
            await createPizzaCategoria(json)
            await createPizzaSabor(json)
 
            return true
        }
        else 
            return false
    }
    catch (error) {

        return false
    }
}

const selectLastId = async function(){
    let sql = `select id from tbl_Pizza order by id desc limit 1`

    try {    
        const rsPizza = await prisma.$queryRawUnsafe(sql)

        if(rsPizza.length > 0) {
            return rsPizza[0].id
        } else {
            return false
        }
    } 
    catch { 
        return false
    }
}

const deletePizza = async function (id){

    let sql = `delete tbl_Categoria_Tipo_Pizza, tbl_Pizza_Sabor, tbl_promocao_pizza
                      from tbl_Pizza
                        left join tbl_Categoria_Tipo_Pizza
                            on tbl_Pizza.id = tbl_Categoria_Tipo_Pizza.id_Pizza
                        left join tbl_Pizza_Sabor
                            on tbl_Pizza.id = tbl_Pizza_Sabor.id_Pizza
                        left join tbl_promocao_pizza
                            on tbl_Pizza.id = tbl_promocao_pizza.id_Pizza
                        where tbl_Pizza.id = ${id}`
                        
    let delSql = `delete from tbl_Pizza where id = ${id}`

    console.log(id);
    try{    
        const result = await prisma.$executeRawUnsafe(sql)
        if(result) {

            const deleteSql = await prisma.$executeRawUnsafe(delSql)

            if (deleteSql)
                return true
            else
                return false
        }
        else
            return false
    } 
    catch (error) {
        console.log(error);
        return false
    }
}

const putPizza = async function (json) {
    let sql = `update tbl_Pizza set 
                    Nome = '${json.nome}', 
                    Preco = '${json.preco}', 
                    Descricao = '${json.descricao}', 
                    Imagem = '${json.img}'
                where id = ${json.id}`
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

const putPreco = async function (precoNormal, descontado, id) {

    let sql = `update tbl_Pizza set 
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

const favoritismo = async function (id){
    let sql = `update tbl_Pizza set 
                    Favoritismo = tbl_Pizza.Favoritismo + 1
                where id = ${id};`
                
    try {
            const result = await prisma.$executeRawUnsafe(sql)
        if(result)
            return true
        else
            return false
    } catch(error) {
        return false
    }
}

const favorites = async function(){
    let sql = `select id, Nome as nome, Preco as preco, Descricao as descricao, Imagem as imagem 
    from tbl_Pizza 
    order by nome, favoritismo desc limit 5`

    try {    
        const rsPizzas = await prisma.$queryRawUnsafe(sql)

        if(rsPizzas.length > 0) {
            return rsPizzas
        } else {
            return false
        }
    } 
    catch { 
        return false
    }
}

module.exports = {
    findPizza, selectAllPizzas, createPizza, deletePizza, selectLastId, putPizza, findPizzaByName, favoritismo, findPizzaName, favorites, selectPrecoPizza, putPreco
}