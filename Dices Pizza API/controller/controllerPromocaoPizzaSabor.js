/********************************************
* Objetivo: Arquivo responsável pela verificação dos dados que serão enviados e tragos da model de Promoção com pizza e do app
* Autor: Gyovanne Martins e Rafael Oliveira
* Data criação: 06/12/2022
* Versão: 1.0
********************************************/

const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js');

const insertPromocaoPizzaPorSabor = async function (promoSaborPizzaJson){
    const { insertPizzasPorSabor, deletePromocaoPizzaSabor, validacoes, quantCriada } = require('../model/DAO/promocaoPizzaSabor');

    if(promoSaborPizzaJson.promocao == undefined || promoSaborPizzaJson.promocao == null || promoSaborPizzaJson.sabor == undefined || promoSaborPizzaJson.sabor == null){
        return {message: MESSAGE_ERROR.REQUIRED_FIELDS, status: 400}
    } else {

        const novasPromocoes = await insertPizzasPorSabor(promoSaborPizzaJson.sabor, promoSaborPizzaJson.promocao)

        if(novasPromocoes.length > 0){
            const qtdePromocoes = await quantCriada(promoSaborPizzaJson.promocao, novasPromocoes.length)
            const validacao = await validacoes(qtdePromocoes, novasPromocoes)
            if(validacao){
                return { message: MESSAGE_SUCCESS.INSERT_ITEM, status: 200 }
            } else {
                await deletePromocaoPizzaSabor(promoSaborPizzaJson.promocao) 
                return { message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 700 }

            }
        } else {
            return { message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 600 }
        }
    } 
}

const deletePromocaoPizzaPorSabor = async function (idPromocao){
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

const listPromocoesPizzasPorSabor = async function () {
    const { selectAllPromocoesPizzas } = require('../model/DAO/promocaoPizza.js')

    const dadosPromocaoPizza = await selectAllPromocoesPizzas()

    if (dadosPromocaoPizza) {
        return {promocoes_Pizzas : dadosPromocaoPizza}
    }
    else
        return false
}

module.exports = {
    insertPromocaoPizzaPorSabor,
    deletePromocaoPizzaPorSabor,
    listPromocoesPizzasPorSabor
}