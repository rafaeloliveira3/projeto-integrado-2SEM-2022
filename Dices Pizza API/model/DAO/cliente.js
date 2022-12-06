/********************************************
* Objetivo: Arquivo responsável pela manipulação de dados com o BD (Insert, Update, Select, Delete) da tabela de Clientes
* Autor: Gyovanne Martins Rafael Oliveira
* Data criação: 28/11/2022
* Versão: 1.0
********************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const selectClient = async function () {
    try {
        const rsCliente = await prisma.$queryRaw`select tbl_Cliente.id, tbl_Cliente.nome, tbl_Cliente.email, tbl_Opcao_Mensagem.nome as opcao_mensagem  from tbl_Cliente inner join tbl_Opcao_Mensagem on tbl_Opcao_Mensagem.id = tbl_Cliente.id_Opcao_Mensagem`

    

        if (rsCliente.length > 0)
            return rsCliente
        else 
            return false
    } 
    catch (error) {
        return false
    }
}

const insertClient = async function(json){
    try {
        let telefone = json.telefone
        
        let sql = `insert into tbl_Cliente(Nome, Email, Mensagem, id_Opcao_Mensagem) values('${json.nome}', '${json.email}', '${json.mensagem}', ${json.opcao_mensagem});`
        const resultClient = await prisma.$executeRawUnsafe(sql)    

        if(resultClient) {
            const { insertTelforClients } = require('./telefone.js')
            let resultTel = [] 
            resultTel.push(await insertTelforClients(telefone[0]))
            if(telefone[1]){
                resultTel.push(await insertTelforClients(telefone[1]))
            }
            if (resultTel)
                return true
            else
                return false

        } else {
            return false
        }
    } catch(error) {
        return false
    }
}

const findClienteByName = async function (name) {
    let sql = `select id, Nome
                from tbl_Cliente
                where nome like '%${name}%'`
                
    try {
        const rsCliente = await prisma.$queryRawUnsafe(sql)
        
        if(rsCliente.length > 0) {
            return rsCliente
        } 
        else {
            return false
        }
    }
    catch (error) {
        return false
    }
}

const findClienteName = async function (name) {

    let sql = `select * from tbl_Cliente where nome like '%${name}%'`

    try {
        const rsAdm = await prisma.$queryRawUnsafe(sql)

        if (rsAdm.length > 0)
            return rsAdm
        else
            return false
    }
    catch (error) {
        return false
    }
}

const deleteClient = async function(id){


    const { deleteTels } = require('./telefone.js')

    let telefonesDel = await deleteTels(id)

    let sql
    
    if(telefonesDel){
        sql = `delete from Tbl_Cliente where id = ${id};`
    }
                
    try{    
        const result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } 
    catch(error) {
        return false
    }
}

const findClient = async function (id) {

    let sql = `select tbl_Cliente.id, tbl_Cliente.nome, tbl_Cliente.email, tbl_Cliente.mensagem, tbl_Opcao_Mensagem.nome as opcao_mensagem  
                    from tbl_Cliente 
               inner join tbl_Opcao_Mensagem
                    on tbl_Opcao_Mensagem.id = tbl_Cliente.id_Opcao_Mensagem
               where tbl_Cliente.id = ${id}`

        
    try {
        const rsClient = await prisma.$queryRawUnsafe(sql)
        if(rsClient){
            const { findTelClient } = require('./telefone.js')         

            const resultTel =  await findTelClient(id) 
            rsClient[0].telefone = resultTel
            if (rsClient.length > 0)
                return rsClient
            else
                return false
        }
    }
    catch (error) {
        return false
    }
}

const selectLastId = async function(){

    let sql = `select id from tbl_Cliente order by id desc limit 1`

    try{    
        const rsServico = await prisma.$queryRawUnsafe(sql)
        if(rsServico.length > 0) {
            return rsServico[0].id
        } else {
            return false
        }
    } catch{ 
        return false
    }
}

module.exports = {
    selectClient, insertClient, findClient, selectLastId, deleteClient, findClienteByName, findClienteName
}