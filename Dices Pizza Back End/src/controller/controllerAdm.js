/********************************************
* Objetivo: Arquivo responsável pela verificação dos dados que serão enviados e tragos da model de administração e do app
* Autor: Gyovanne Martins e Rafael Oliveira
* Data criação: 21/11/2022
* Versão: 1.0
********************************************/

const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js');

const listAdm = async function () {
    const { selectAllAdm } = require('../model/DAO/adm.js')

    const dadosAdm = await selectAllAdm()

    if (dadosAdm) {
        return {admin : dadosAdm}
    }
    else
        return false
}

const searchAdm = async function (id) {
    const { findAdm } = require('../model/DAO/adm.js')

    if (id == '' || id == undefined) {
        return {status : 400, message : MESSAGE_ERROR.REQUIRED_ID }
    }
    else {
        const dadosAdm = await findAdm(id)
        if (dadosAdm)
            return {admin : dadosAdm}
        else
            return false
    }
}

const insertAdms = async function(admJson) {
    const { insertAdm, deleteAdm, selectLastId } = require('../model/DAO/adm.js');

    let telefone = admJson.telefone

    if(admJson.nome == undefined || admJson.nome == null || admJson.email == undefined || admJson.email == null || admJson.senha == undefined || admJson.senha == null || telefone.ddd == undefined || telefone.ddd == null || telefone.telefone == undefined || telefone.telefone == null || telefone.formato == undefined || telefone.formato == null){
        return {message: MESSAGE_ERROR.REQUIRED_FIELDS, status: 400}
    } else {

        const novoAdm = await insertAdm(admJson)


        if(novoAdm) {
            let anoAtual = new Date().getFullYear();
            let idNovoAdm = await selectLastId()
            let usuario = `${idNovoAdm}${anoAtual}`
            admJson.usuario = usuario
            admJson.id = idNovoAdm
            let newAdm = await updateAdm(admJson);

            if(newAdm) {
                return { message: MESSAGE_SUCCESS.INSERT_ITEM, status: 200 }
            } else {
                await deleteAdm(idNovoAdm) 
                return { message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 600 }
            }
        } else {
            return { message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 700 }
        }
    } 
}

const searchByName = async function(name) {
    const { findAdmName } = require('../model/DAO/adm.js');


    if(name == undefined || name == null){
        return {message: MESSAGE_ERROR.REQUIRED_FIELDS, status: 400}
    } else {
        const dadosAdm = await findAdmName(name)
        if (dadosAdm)
            return {admin : dadosAdm}
        else
            return false
    }
}

const updateAdm = async function (json) {
    const { putAdm } = require('../model/DAO/adm.js');
    
    if(json.id == undefined || json.id == '' ){
        return {message: MESSAGE_ERROR.REQUIRED_ID, status: 400};
    }
    if(json.nome == undefined || json.nome == null || json.email == undefined || json.email == null || json.senha == undefined || json.senha == null) {
        return {message: MESSAGE_ERROR.REQUIRED_FIELDS, status: 400}
    } 
    if (!json.email.includes('@')) {
        return {message: MESSAGE_ERROR.INVALID_EMAIL, status: 400}
    }
    else {
        const updated = await putAdm(json);
        
        if(updated){
            return {message: MESSAGE_SUCCESS.UPDATE_ITEM, status: 200}
        } else{
            return {message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500}
        }
    } 
}

const deleteAdms = async function (id){
    const { deleteAdm, findAdm } = require('../model/DAO/adm.js');
    
    if(id == undefined || id == '' ){
        return {message: MESSAGE_ERROR.REQUIRED_ID, status: 400};
    } else {
        const buscar = await findAdm(id);
        
        if(buscar){
            let deletar = await deleteAdm(id);
            
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

const loginAdm = async function (json){ 

    const { login } = require('../model/DAO/adm.js'); 

    const jwt = require('../../middleware/middliewareJWT.js') 


    if(json.senha == undefined || json.senha == null || json.usuario == undefined || json.usuario == null){ 

        return {message: MESSAGE_ERROR.REQUIRED_FIELDS, status: 400} 

    } else { 
        const loginUser = await login(json) 

        if(loginUser) { 

	        let tokenUser = await jwt.createJWT(loginUser.id) 
        
	        loginUser[0].token  =  tokenUser 
            return { message: loginUser[0], status: 200 } 

        } else { 

            return { message: MESSAGE_ERROR.NOT_FOUND_DB, status: 404 } 

        } 

    }  

} 

module.exports = {
    listAdm, deleteAdms, updateAdm, insertAdms, searchAdm, searchByName, loginAdm
}


