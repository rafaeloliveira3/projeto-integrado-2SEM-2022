/********************************************
* Objetivo: Arquivo responsável pela verificação dos dados que serão enviados e tragos da model de Promoção com pizza e do app
* Autor: Gyovanne Martins e Rafael Oliveira
* Data criação: 30/11/2022
* Versão: 1.0
********************************************/

const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js');

const insertPromocaoPizza = async function (promocaoJson){
    const { insertPromocaoPizza, deletePromocaoPizza, selectLastId_Pizza } = require('../model/DAO/promocaoPizza');
    
    if(promocaoJson.pizza == undefined || promocaoJson.pizza == null || promocaoJson.promocao == undefined || promocaoJson.promocao == null){
        return {message: MESSAGE_ERROR.REQUIRED_FIELDS, status: 400}
    } else {
        const novaPromocao = await insertPromocaoPizza(promocaoJson)
        if(novaPromocao){
            let idNovaPromocao = await selectLastId_Pizza()
            if(idNovaPromocao) {
                return { message: MESSAGE_SUCCESS.INSERT_ITEM, status: 200 }
            } else {
                await deletePromocaoPizza(idNovaPromocao) 
                return { message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500 }

            }
        } else {
            return { message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500 }
        }
    } 
}

const deletePromocaoPizza = async function (idPromocao){
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

const listPromocoesPizzas = async function () {
    const { selectAllPromocoesPizzas } = require('../model/DAO/promocaoPizza.js')

    const dadosPromocaoPizza = await selectAllPromocoesPizzas()

    if (dadosPromocaoPizza) {
        return {promocoes_Pizzas : dadosPromocaoPizza}
    }
    else
        return false
}

module.exports = {
    insertPromocaoPizza,
    deletePromocaoPizza,
    listPromocoesPizzas
}