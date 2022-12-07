/********************************************
* Objetivo: Arquivo responsável pela verificação dos dados que serão enviados e tragos da model de serviço e do app
* Autor: Gyovanne Martins Rafael Oliveira
* Data criação: 21/11/2022
* Versão: 1.0
********************************************/

const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js');

const listServices = async function () {
    const { selectAllServicos } = require('../model/DAO/servicos.js')

    const dadosServicos = await selectAllServicos()

    if (dadosServicos) {
        return {servicos : dadosServicos}
    }
    else
        return false
}
const findServices = async function (id) {
    const { findServico } = require('../model/DAO/servicos.js')

    if (id == '' || id == undefined) {
        return {status : 400, message : MESSAGE_ERROR.REQUIRED_ID }
    }
    else {
        const dadosServico = await findServico(id)
        if (dadosServico)
            return {servico : dadosServico}
        else
            return false
    }
}
const findServicesByName = async function (name) {
    const { findServicoByName } = require('../model/DAO/servicos.js')

    if (name == '' || name == undefined) {
        return {status : 400, message : MESSAGE_ERROR.REQUIRED_FIELDS }
    }
    else {
        const dadosservicos = await findServicoByName(name)
        if (dadosservicos)
            return {Servicos : dadosservicos}
        else
            return false
    }
}
const insertServices = async function (servicoJson){ 
    const { insertServico, deleteServico, selectLastId } = require('../model/DAO/servicos.js');
    
    if(servicoJson.nome == undefined || servicoJson.nome == null || servicoJson.descricao == undefined || servicoJson.descricao == null){
        return {message: MESSAGE_ERROR.REQUIRED_FIELDS, status: 400}
    } else {
        const novoServico = await insertServico(servicoJson)
        if(novoServico){
            let idNovoServico = await selectLastId()
            if(idNovoServico) {
                return { message: MESSAGE_SUCCESS.INSERT_ITEM, status: 200 }
            } else {
                await deleteServico(idNovoServico) 
                return { message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500 }

            }
        } else {
            return { message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500 }
        }
    } 
} 
const updateServices = async function (servicoJson){
    const { updateServico } = require('../model/DAO/servicos.js');
    
    if(servicoJson.id == undefined || servicoJson.id == '' ){
        return {message: MESSAGE_ERROR.REQUIRED_ID, status: 400};
    }
    if(servicoJson.nome == undefined || servicoJson.nome == null || servicoJson.descricao == undefined || servicoJson == null){
        return {message: MESSAGE_ERROR.REQUIRED_FIELDS, status: 400}
    } else {
        const atualizarServico = await updateServico(servicoJson);
        
        if(atualizarServico){
            return {message: MESSAGE_SUCCESS.UPDATE_ITEM, status: 200}
        } else{
            return {message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500}
        }
    } 
}
const deleteServices = async function (idServico){
    const { deleteServico } = require('../model/DAO/servicos.js');
    
    if(idServico == undefined || idServico == '' ){
        return {message: MESSAGE_ERROR.REQUIRED_ID, status: 400};
    } else {
        const buscarServico = await findServices(idServico);
        
        if(buscarServico){
            let deletarServico = await deleteServico(idServico);
            
            if(deletarServico){
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
    listServices,
    findServices,
    insertServices,
    updateServices,
    deleteServices,
    findServicesByName
}