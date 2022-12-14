/********************************************
* Objetivo: Arquivo responsável pela verificação dos dados que serão enviados e tragos da model de Promoção e do app
* Autor: Gyovanne Martins e Rafael Oliveira
* Data criação: 30/11/2022
* Versão: 1.0
********************************************/

const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js');

const listPromocoes = async function () {
    const { selectAllPromocaes } = require('../model/DAO/promocao.js')

    const dadosPromocoes = await selectAllPromocaes()

    if (dadosPromocoes) {
        return {promocao : dadosPromocoes}
    }
    else
        return false
}

const findPromocao = async function (id) {
    const { findPromocao } = require('../model/DAO/promocao.js')

    if (id == '' || id == undefined) {
        return {status : 400, message : MESSAGE_ERROR.REQUIRED_ID }
    }
    else {
        const dadosPromocao = await findPromocao(id)
        if (dadosPromocao)
            return {Promocao : dadosPromocao}
        else
            return false
    }
}

const findPromocaoByDescription = async function (Description) {
    const { findPromocaoDescription } = require('../model/DAO/promocao.js')

    if (Description == '' || Description == undefined) {
        return {status : 400, message : MESSAGE_ERROR.REQUIRED_FIELDS }
    }
    else {
        const dadospromocao = await findPromocaoDescription(Description)
        if (dadospromocao)
            return {Promocao : dadospromocao}
        else
            return false
    }
}

const insertPromocao = async function (promocaoJson){
    const { insertPromocao, deletePromocao, selectLastId } = require('../model/DAO/promocao.js');
    
    if(promocaoJson.descricao == undefined || promocaoJson.descricao == null || promocaoJson.formato == undefined || promocaoJson.formato == null){
        return {message: MESSAGE_ERROR.REQUIRED_FIELDS, status: 400}
    } else {
        console.log(promocaoJson);
        const novaPromocao = await insertPromocao(promocaoJson)
        if(novaPromocao){
            let idNovaPromocao = await selectLastId()
            if(idNovaPromocao) {
                return { message: MESSAGE_SUCCESS.INSERT_ITEM, status: 200 }
            } else {
                await deletePromocao(idNovaPromocao) 
                return { message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 501 }

            }
        } else {
            return { message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500 }
        }
    } 
}
const updatePromocoes = async function (promocaoJson){
    const { updatePromocao } = require('../model/DAO/promocao.js');

    if(promocaoJson.id == undefined || promocaoJson.id == '' ){
        return {message: MESSAGE_ERROR.REQUIRED_ID, status: 400};
    }
    if(promocaoJson.descricao == undefined || promocaoJson.descricao == null || promocaoJson.formato == undefined || promocaoJson.formato == null){
        return {message: MESSAGE_ERROR.REQUIRED_FIELDS, status: 400}
    } else {
        const atualizarServico = await updatePromocao(promocaoJson);
        
        if(atualizarServico){
            return {message: MESSAGE_SUCCESS.UPDATE_ITEM, status: 200}
        } else{
            return {message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500}
        }
    } 
}
const deletePromocao = async function (idPromocao){
    const { deletePromocao } = require('../model/DAO/promocao.js');
    
    if(idPromocao == undefined || idPromocao == '' ){
        return {message: MESSAGE_ERROR.REQUIRED_ID, status: 400};
    } else {
        const buscarPromocao = await findPromocao(idPromocao);
        
        if(buscarPromocao){
            let deletarPromocao = await deletePromocao(idPromocao);
            
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

module.exports = {
    listPromocoes,
    findPromocao,
    insertPromocao,
    updatePromocoes,
    deletePromocao,
    findPromocaoByDescription
}