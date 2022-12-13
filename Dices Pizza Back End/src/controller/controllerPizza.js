/********************************************
* Objetivo: Arquivo responsável pela verificação dos dados que serão enviados e tragos da model de pizza e do app
* Autor: Gyovanne Martins Rafael Oliveira
* Data criação: 21/11/2022
* Versão: 1.0
********************************************/

const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modules/config.js');

const searchPizza = async function (id) {
    const { findPizza } = require('../model/DAO/pizza.js')

    if (id == '' || id == undefined) {
        return {status : 400, message : MESSAGE_ERROR.REQUIRED_ID }
    }
    else {
        const dadosPizza = await findPizza(id)
        ;
        if (dadosPizza)
            return {pizza : dadosPizza}
        else
            return false
    }
}

const listPizza = async function () {

    const { selectAllPizzas } = require('../model/DAO/pizza.js')

    const dadosPizza = await selectAllPizzas()
 
    if (dadosPizza) {
        return {pizza : dadosPizza}
    }
    else
        return false
}

const findPizzaByName = async function (name) {
    const { findPizzaName } = require('../model/DAO/pizza.js')

    if (name == '' || name == undefined) {
        return {status : 400, message : MESSAGE_ERROR.REQUIRED_FIELDS }
    }
    else {
        const dadospizza = await findPizzaName(name)
        if (dadospizza)
            return {Pizza : dadospizza}
        else
            return false
    }
}

const deletePizzas = async function (id){
    
    if(id == undefined || id == '' ){
        return {message: MESSAGE_ERROR.REQUIRED_ID, status: 400};
    } else {
        const buscar = await searchPizza(id);
        
        if(buscar){

            const { deletePizza } = require('../model/DAO/pizza.js')

            let deletar = await deletePizza(id);
            
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

const insertPizza = async function (json) {
    const { createPizza, selectLastId } = require('../model/DAO/pizza.js')
    console.log(json);
    if (json.nome == undefined || json.nome == null || json.preco == undefined || json.preco == null || json.sabor == undefined || json.sabor == null || json.categoria == undefined || json.categoria == null) {
        return {message: MESSAGE_ERROR.REQUIRED_FIELDS, status: 400}
    } else {
        json.favorito = 0
        const novaPizza = await createPizza(json)
        
        if(novaPizza){
            let id = await selectLastId()

            if(id) {
                return { message: MESSAGE_SUCCESS.INSERT_ITEM, status: 200 }
            } 
            else {
                await deletePizzas(id) 
                return { message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500 }

            }
        } else {
            return { message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500 }
        }
    } 
}

const updatePizzas = async function (pizzaJson){
    const { putPizza } = require('../model/DAO/pizza.js');
    
    if(pizzaJson.id == undefined || pizzaJson.id == '' ){
        return {message: MESSAGE_ERROR.REQUIRED_ID, status: 400};
    }
    if (pizzaJson.nome == undefined || pizzaJson.nome == null || pizzaJson.preco == undefined || pizzaJson.preco == null) {
        return {message: MESSAGE_ERROR.REQUIRED_FIELDS, status: 400}
    } else {
        const atualizarPizza = await putPizza(pizzaJson);
        
        if(atualizarPizza){
            return {message: MESSAGE_SUCCESS.UPDATE_ITEM, status: 200}
        } else{
            return {message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500}
        }
    } 
}

const favorite = async function (id){
    const { favoritismo } = require('../model/DAO/pizza.js');
    
    if(id == undefined || id == '' ){
        return {message: MESSAGE_ERROR.REQUIRED_ID, status: 400};
    } else {
        const atualizarFavorito = await favoritismo(id);
        
        if(atualizarFavorito){
            return {message: MESSAGE_SUCCESS.UPDATE_ITEM, status: 200}
        } else{
            return {message: MESSAGE_ERROR.INTERNAL_ERROR_DB, status: 500}
        }
    } 
}

const listFavorites = async function(){
    const { favorites } = require('../model/DAO/pizza.js')

    const dadosPizza = await favorites()
 
    if (dadosPizza) {
        return {pizza : dadosPizza}
    }
    else
        return false
}

module.exports = {
    searchPizza, listPizza, deletePizzas, insertPizza, updatePizzas, favorite, listFavorites, findPizzaByName
}