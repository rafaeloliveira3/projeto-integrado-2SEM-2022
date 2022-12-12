/********************************************
* Objetivo: Arquivo responsável pela verificação dos dados que serão enviados e tragos da model de bebida e do app
* Autor: Gyovanne Martins e Rafael Oliveira
* Data criação: 21/11/2022
* Versão: 1.0
********************************************/
 
const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js');

const listDrinks = async function () {
    const { selectAllBebidas } = require('../model/DAO/bebidas.js')
 
    const dadosdrinks = await selectAllBebidas()
    if (dadosdrinks) {
        return {drinks : dadosdrinks}
    }
    else
        return false
}

const findDrinks = async function (id) {
    const { findBebida } = require('../model/DAO/bebidas.js')

    if (id == '' || id == undefined) {
        return {status : 400, message : MESSAGE_ERROR.REQUIRED_ID }
    }
    else {
        const dadosdrink = await findBebida(id)
        if (dadosdrink)
            return {drink : dadosdrink}
        else
            return false
    }
}

const findDrinksByName = async function (name) { 
    const { findBebidaName } = require('../model/DAO/bebidas.js')

    if (name == '' || name == undefined) {
        return {status : 400, message : MESSAGE_ERROR.REQUIRED_FIELDS }
    }
    else {
        const dadosdrink = await findBebidaName(name)
        if (dadosdrink)
            return {drink : dadosdrink}
        else
            return false
    }
}

const insertDrinks = async function (drinkJson){
    const { insertBebida, deleteBebida, selectLastId } = require('../model/DAO/bebidas.js');
    
    if(drinkJson.nome == undefined || drinkJson.nome == null || drinkJson.volume == undefined || drinkJson.volume == null || drinkJson.preco == undefined || drinkJson.preco == null || drinkJson.especificidade == undefined || drinkJson.especificidade == null){
        return {message: MESSAGE_ERROR.REQUIRED_FIELDS, status: 400}
    } else {
        const novodrink = await insertBebida(drinkJson)
         
        if(novodrink){
            let idNovodrink = await selectLastId()
            if(idNovodrink) {
                return { message: MESSAGE_SUCCESS.INSERT_ITEM, status: 200 }
            } else {
                await deleteBebida(idNovodrink) 
                return { message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500 }

            }
        } else {
            return { message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500 }
        }
    } 
}

const updateDrinks = async function (drinkJson){
    const { updateBebida } = require('../model/DAO/bebidas.js');
    
    if(drinkJson.id == undefined || drinkJson.id == '' ){
        return {message: MESSAGE_ERROR.REQUIRED_ID, status: 400};
    }
    if(drinkJson.nome == undefined || drinkJson.nome == null || drinkJson.volume == undefined || drinkJson.volume == null || drinkJson.especificidade == undefined || drinkJson.especificidade == null || drinkJson.preco == undefined || drinkJson.preco == null ){
        return {message: MESSAGE_ERROR.REQUIRED_FIELDS, status: 400}
    } else {
        const atualizardrink = await updateBebida(drinkJson);
        
        if(atualizardrink){
            return {message: MESSAGE_SUCCESS.UPDATE_ITEM, status: 200}
        } else{
            return {message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500}
        }
    } 
}

const deleteDrinks = async function (iddrink){
    const { deleteBebida } = require('../model/DAO/bebidas.js');
    
    if(iddrink == undefined || iddrink == '' ){
        return {message: MESSAGE_ERROR.REQUIRED_ID, status: 400};
    } else {
        const buscardrink = await findDrinks(iddrink);
        
        if(buscardrink){
            let deletardrink = await deleteBebida(iddrink);
            
            if(deletardrink){
                return {message: MESSAGE_SUCCESS.DELETE_ITEM, status: 200}
            } else{
                return {message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500}
            }
        } else{
            return {message: MESSAGE_ERROR.NOT_FOUND_DB, status: 404}
        }
    } 
}

module.exports = {
    listDrinks,
    findDrinks,
    insertDrinks,
    updateDrinks,
    deleteDrinks,
    findDrinksByName
}