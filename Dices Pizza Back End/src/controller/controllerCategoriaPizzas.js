/********************************************
* Objetivo: Arquivo responsável pela verificação dos dados que serão enviados e tragos da model de categorias de pizzas e do app
* Autor: Gyovanne Martins e Rafael Oliveira
* Data criação: 21/11/2022
* Versão: 1.0
********************************************/

const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js');

const listCategorias = async function () {
    const { selectAllCategorias } = require('../model/DAO/categoriaPizza.js')

    const dadosCategorias = await selectAllCategorias()

    if (dadosCategorias) {
        return {categorias : dadosCategorias}
    }
    else
        return false
}



const findCategorias = async function (id) {
    const { findCategorias } = require('../model/DAO/categoriaPizza.js')

    if (id == '' || id == undefined) {
        return {status : 400, message : MESSAGE_ERROR.REQUIRED_ID }
    }
    else {
        const dadosCategorias = await findCategorias(id)
        if (dadosCategorias)
            return {categorias : dadosCategorias}
        else
            return false
    }
}
const findCategoriaPizzaByName = async function (name) {
    const { findCategoriaPizzaName } = require('../model/DAO/categoriaPizza.js')
 
    if (name == '' || name == undefined) {
        return {status : 400, message : MESSAGE_ERROR.REQUIRED_FIELDS }
    }
    else {
        const dadoscategoria = await findCategoriaPizzaName(name)
        if (dadoscategoria)
            return {Categoria : dadoscategoria}
        else
            return false
    }
}

const insertCategorias = async function (json){
    const { createCategoria, deleteCategoria, selectLastId } = require('../model/DAO/categoriaPizza.js');
    
    if(json.nome == undefined || json.nome == null || json.descricao == null || json.descricao == undefined){
        return {message: MESSAGE_ERROR.REQUIRED_FIELDS, status: 400}
    } else {
        console.log(json);
        const novaCategoria = await createCategoria(json)
        if(novaCategoria){
            let idNovaCategoria = await selectLastId()
            if(idNovaCategoria) {
                return { message: MESSAGE_SUCCESS.INSERT_ITEM, status: 200 }
            } else {
                await deleteCategoria(idNovaCategoria) 
                return { message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500 }

            }
        } else {
            return { message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500 }
        }
    } 
}
const updateCategoria = async function (json){
    const { putCategoria } = require('../model/DAO/categoriaPizza.js');
    
    if(json.id == undefined || json.id == '' ){
        return {message: MESSAGE_ERROR.REQUIRED_ID, status: 400};
    }
    if(json.nome == undefined || json.nome == null){
        return {message: MESSAGE_ERROR.REQUIRED_FIELDS, status: 400}
    } else {
        const attCategoria = await putCategoria(json);
            
        if(attCategoria){
            return {message: MESSAGE_SUCCESS.UPDATE_ITEM, status: 200}
        } else{
            return {message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500}
        }
    } 
}

const deleteCategoria = async function (id){
    const { removeCategoria } = require('../model/DAO/categoriaPizza.js');
    
    if(id == undefined || id == '' ){
        return {message: MESSAGE_ERROR.REQUIRED_ID, status: 400};
    } else {
        const buscarCategoria = await findCategorias(id);
        
        if(buscarCategoria){
            let deletarCategoria = await removeCategoria(id);
            
            if(deletarCategoria){
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
    listCategorias,
    findCategorias,
    insertCategorias,
    updateCategoria,
    deleteCategoria,
    findCategoriaPizzaByName
}