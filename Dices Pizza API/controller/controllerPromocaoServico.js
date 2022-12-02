/********************************************
* Objetivo: Arquivo responsável pela verificação dos dados que serão enviados e tragos da model de Promoção com serviços e do app
* Autor: Gyovanne Martins e Rafael Oliveira
* Data criação: 30/11/2022
* Versão: 1.0
********************************************/

const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js');

const insertPromocaoServico = async function (promocaoJson){
    const { insertPromocaoServicos, deletePromocaoServicos, selectLastId_Servicos } = require('../model/DAO/promocaoServicos.js');
    
    if(promocaoJson.servico == undefined || promocaoJson.servico == null || promocaoJson.promocao == undefined || promocaoJson.promocao == null){
        return {message: MESSAGE_ERROR.REQUIRED_FIELDS, status: 400}
    } else {
        const novaPromocao = await insertPromocaoServicos(promocaoJson)
        if(novaPromocao){
            let idNovaPromocao = await selectLastId_Servicos()
            if(idNovaPromocao) {
                return { message: MESSAGE_SUCCESS.INSERT_ITEM, status: 200 }
            } else {
                await deletePromocaoServicos(idNovaPromocao) 
                return { message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500 }

            }
        } else {
            return { message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500 }
        }
    } 
}

const deletePromocaoServico = async function (idPromocao){
    const { deletePromocaoServicos, findPromocaoServicos } = require('../model/DAO/promocaoServicos.js');
    
    if(idPromocao == undefined || idPromocao == '' ){
        return {message: MESSAGE_ERROR.REQUIRED_ID, status: 400};
    } else {
        const buscarPromocao = await findPromocaoServicos(idPromocao);
        
        if(buscarPromocao){
            let deletarPromocao = await deletePromocaoServicos(idPromocao);
            
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

const listPromocoesServicos = async function () {
    const { selectAllPromocoesServicos } = require('../model/DAO/promocaoServicos.js')

    const dadosPromocaoServicos = await selectAllPromocoesServicos()

    if (dadosPromocaoServicos) {
        return {promocoes_Servico : dadosPromocaoServicos}
    }
    else
        return false
}

module.exports = {
    insertPromocaoServico,
    deletePromocaoServico,
    listPromocoesServicos
}