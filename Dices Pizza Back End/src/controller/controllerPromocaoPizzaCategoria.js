/********************************************
* Objetivo: Arquivo responsável pela verificação dos dados que serão enviados e tragos da model de Promoção com pizza e do app
* Autor: Gyovanne Martins e Rafael Oliveira
* Data criação: 30/11/2022
* Versão: 1.0
********************************************/

const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js');

const insertPromocaoPizzaPorCategoria = async function (promoCatPizzaJson){
    const { insertPizzasPorCategoria, deletePromocaoPizzaCategoria, validacoes, quantCriada } = require('../model/DAO/promocaoPizzaCategoria');

    if(promoCatPizzaJson.promocao == undefined || promoCatPizzaJson.promocao == null || promoCatPizzaJson.categoria == undefined || promoCatPizzaJson.categoria == null){
        return {message: MESSAGE_ERROR.REQUIRED_FIELDS, status: 400}
    } else {
        const novasPromocoes = await insertPizzasPorCategoria(promoCatPizzaJson.categoria, promoCatPizzaJson.promocao)

        if(novasPromocoes.length > 0){
            const qtdePromocoes = await quantCriada(promoCatPizzaJson.promocao, novasPromocoes.length)
            const validacao = await validacoes(qtdePromocoes, novasPromocoes)
            if(validacao){
                return { message: MESSAGE_SUCCESS.INSERT_ITEM, status: 200 }
            } else {
                await deletePromocaoPizzaCategoria(promoCatPizzaJson.promocao) 
                return { message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500 }

            }
        } else {
            return { message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500 }
        }
    } 
}

const deletePromocaoPizzaPorCategoria = async function (idPromocao){
    const { deletePromocaoPizza, findPromocaoPizza } = require('../model/DAO/promocaoPizza.js');
    
    if(idPromocao == undefined || idPromocao == '' ){
        return {message: MESSAGE_ERROR.REQUIRED_ID, status: 400};
    } else {
        const buscarPromocao = await findPromocaoPizza(idPromocao);
        if(buscarPromocao){
            let deletarPromocao = await deletePromocaoPizza(idPromocao);
            
            if(deletarPromocao){
                return {message: MESSAGE_SUCCESS.DELETE_ITEM, status: 200}
            } else{
                return {message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500}
            }
        } else{
            return {message: MESSAGE_ERROR.NOT_FOUND_DB, status: 404}
        }
    } 
}

const listPromocoesPizzasPorCategoria = async function () {
    const { selectAllPromocoesPizzas } = require('../model/DAO/promocaoPizza.js')

    const dadosPromocaoPizza = await selectAllPromocoesPizzas()

    if (dadosPromocaoPizza) {
        return {promocoes_Pizzas : dadosPromocaoPizza}
    }
    else
        return false
}

module.exports = {
    insertPromocaoPizzaPorCategoria,
    deletePromocaoPizzaPorCategoria,
    listPromocoesPizzasPorCategoria
}