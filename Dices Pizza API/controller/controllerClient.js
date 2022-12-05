/********************************************
* Objetivo: Arquivo responsável pela verificação dos dados que serão enviados e tragos da model de clientes e do app
* Autor: Gyovanne Martins e Rafael Oliveira
* Data criação: 28/11/2022
* Versão: 1.0
********************************************/

const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js');
const { insertClient, deleteClient, selectLastId, selectClient, findClient} = require('../model/DAO/cliente.js');

const listClient = async function () {
    const dadosCliente = await selectClient()
 
    if (dadosCliente) {
        return {client : dadosCliente}
    }
    else
        return false
}

const insertNewClient = async function (json){
    if(json.nome == undefined || json.nome == null || json.mensagem == undefined || json.mensagem == null || json.email == undefined || json.email == null || json.telefone == undefined || json.telefone == null){
        return {message: MESSAGE_ERROR.REQUIRED_FIELDS, status: 400}
    } else {
        const novoCliente = await insertClient(json)
        if(novoCliente){
            let idNovoCliente = await selectLastId()
            if(idNovoCliente) {
                return { message: MESSAGE_SUCCESS.INSERT_ITEM, status: 200 }
            } else {
                await deleteServico(idNovoCliente) 
                return { message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500 }

            }
        } else {
            return { message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500 }
        }
    } 
} 

const findClienteByName = async function (name) {
    const { findClienteName } = require('../model/DAO/cliente.js')

    if (name == '' || name == undefined) {
        return {status : 400, message : MESSAGE_ERROR.REQUIRED_FIELDS }
    }
    else {
        const dadoscliente = await findClienteName(name)
        if (dadoscliente)
            return {Cliente : dadoscliente}
        else
            return false
    }
}

const deleteClients = async function (id){
    
    if(id == undefined || id == '' ){
        return {message: MESSAGE_ERROR.REQUIRED_ID, status: 400};
    } else {
        const buscar = await findClient(id);
        
        if(buscar){
            let deletar = await deleteClient(id);
            
            if(deletar){
                return {message: MESSAGE_SUCCESS.DELETE_ITEM, status: 200}
            } else{
                return {message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500}
            }
        } else{
            return {message: MESSAGE_ERROR.NOT_FOUND_DB, status: 404}
        }
    } 
}

const searchClient = async function (id) {

    if (id == '' || id == undefined) {
        return {status : 400, message : MESSAGE_ERROR.REQUIRED_ID }
    }
    else {
        const dadosClient = await findClient(id)
        
        if (dadosClient)
            return {cliente : dadosClient}
        else
            return false
    }
}

module.exports = {
    listClient, insertNewClient, deleteClients, searchClient, findClienteByName
}