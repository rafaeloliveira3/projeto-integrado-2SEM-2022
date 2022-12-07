/********************************************
* Objetivo: Arquivo responsável pela verificação dos dados que serão enviados e tragos da model de sabor de sabores de pizzas e do app
* Autor: Gyovanne Martins e Rafael Oliveira
* Data criação: 1/12/2022
* Versão: 1.0
********************************************/

const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js');

const listSabor = async function () {
    const { selectAllSabores } = require('../model/DAO/saborPizza.js')

    const dadosSabor = await selectAllSabores()

    if (dadosSabor) {
        return {sabor : dadosSabor}
    }
    else
        return false
}
const findSabor = async function (id) {
    const { findSabor } = require('../model/DAO/saborPizza.js')

    if (id == '' || id == undefined) {
        return {status : 400, message : MESSAGE_ERROR.REQUIRED_ID }
    }
    else {
        const dadosSabor = await findSabor(id)
        if (dadosSabor)
            return {sabor : dadosSabor}
        else
            return false
    }
}
 
const findSaborPizzaByName = async function (name) {
    const { findSaborName } = require('../model/DAO/saborPizza.js')

    if (name == '' || name == undefined) {
        return {status : 400, message : MESSAGE_ERROR.REQUIRED_FIELDS }
    }
    else {
        const dadosSabor = await findSaborName(name)
        if (dadosSabor)
            return {Sabor : dadosSabor}
        else
            return false
    }
}

const insertSabor = async function (json){
    const { createSabor, removeSabor, selectLastId } = require('../model/DAO/saborPizza.js');
    
    if(json.nome == undefined || json.nome == null){
        return {message: MESSAGE_ERROR.REQUIRED_FIELDS, status: 400} 
    } else {
        const novoSabor = await createSabor(json)
        if(novoSabor){
            let idNovoSabor = await selectLastId()
            if(idNovoSabor) {
                return { message: MESSAGE_SUCCESS.INSERT_ITEM, status: 200 }
            } else {
                await removeSabor(idNovoSabor) 
                return { message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500 }

            }
        } else {
            return { message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500 }
        }
    } 
}
const updateSabor = async function (json){
    const { putSabor } = require('../model/DAO/saborPizza.js');
    
    if(json.id == undefined || json.id == '' ){
        return {message: MESSAGE_ERROR.REQUIRED_ID, status: 400};
    }
    if(json.nome == undefined || json.nome == null){
        return {message: MESSAGE_ERROR.REQUIRED_FIELDS, status: 400}
    } else {
        const upSabor = await putSabor(json);
            
        if(upSabor){
            return {message: MESSAGE_SUCCESS.UPDATE_ITEM, status: 200}
        } else{
            return {message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500}
        }
    } 
}

const deleteSabor = async function (id){
    const { removeSabor } = require('../model/DAO/saborPizza.js');
    
    if(id == undefined || id == '' ){
        return {message: MESSAGE_ERROR.REQUIRED_ID, status: 400};
    } else {
        const buscarSabor = await findSabor(id);
        
        if(buscarSabor){
            let deletarSabor = await removeSabor(id);
            
            if(deletarSabor){
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
    listSabor,
    findSabor,
    insertSabor,
    updateSabor,
    deleteSabor,
    findSaborPizzaByName
}