/********************************************
* Objetivo: Arquivo responsável pela verificação dos dados que serão enviados e tragos da model de Promoção com bebidas e do app
* Autor: Gyovanne Martins e Rafael Oliveira
* Data criação: 30/11/2022
* Versão: 1.0
********************************************/

const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js');

const insertPromocaoBebida = async function (promocaoJson){
    const { insertPromocaoBebida, deletePromocaoBebida, selectLastId_Bebida } = require('../model/DAO/promocaoBebida');
    
    if(promocaoJson.bebida == undefined || promocaoJson.bebida == null || promocaoJson.promocao == undefined || promocaoJson.promocao == null){
        return {message: MESSAGE_ERROR.REQUIRED_FIELDS, status: 400}
    } else {
        const novaPromocao = await insertPromocaoBebida(promocaoJson)
        if(novaPromocao){
            let idNovaPromocao = await selectLastId_Bebida()
            if(idNovaPromocao) {
                return { message: MESSAGE_SUCCESS.INSERT_ITEM, status: 200 }
            } else {
                await deletePromocaoBebida(idNovaPromocao) 
                return { message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500 }

            }
        } else {
            return { message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500 }
        }
    } 
}

const deletePromocaoBebida = async function (idPromocao){
    const { deletePromocaoBebida, findPromocaoBebida } = require('../model/DAO/promocaoBebida.js');
    
    if(idPromocao == undefined || idPromocao == '' ){
        return {message: MESSAGE_ERROR.REQUIRED_ID, status: 400};
    } else {
        const buscarPromocao = await findPromocaoBebida(idPromocao);
        
        if(buscarPromocao){
            let deletarPromocao = await deletePromocaoBebida(idPromocao);
            
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

const listPromocoesBebidas = async function () {
    const { selectAllPromocoesBebidas } = require('../model/DAO/promocaoBebida.js')

    const dadosPromocaoBebida = await selectAllPromocoesBebidas()

    if (dadosPromocaoBebida) {
        return {promocoes_Bebidas : dadosPromocaoBebida}
    }
    else
        return false
}

module.exports = {
    insertPromocaoBebida,
    deletePromocaoBebida,
    listPromocoesBebidas
}