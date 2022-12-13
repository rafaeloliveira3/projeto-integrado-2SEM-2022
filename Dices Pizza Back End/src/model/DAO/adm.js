/********************************************
* Objetivo: Arquivo responsável pela manipulação de dados com o BD (Insert, Update, Select, Delete) da tabela de Administrador
* Autor: Gyovanne Martins Rafael Oliveira
* Data criação: 21/11/2022
* Versão: 1.0
********************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertAdm = async function(json){
    try {
        let telefone = json.telefone
        
        let sql = `insert into tbl_Administrador(Nome, Email, Senha, Usuario) values('${json.nome}','${json.email}' , md5('${json.senha}'), '${json.usuario}');`
        const resultAdm = await prisma.$executeRawUnsafe(sql)    
        console.log(sql);
        if(resultAdm) {
            const { insertTelforAdmins } = require('./telefone.js')            
            const resultTel =  await insertTelforAdmins(telefone)    
           
            if (resultTel) {
                return true
            }
            else
                return false

        } else {
            return false
        }
    } catch(error) {
        console.log(error);
        return false
    }
}

const putAdm = async function (json) {

    let telefone = json.telefone

    let sql = `update tbl_Telefone_Administrador
                inner join tbl_Administrador on tbl_Administrador.id = tbl_Telefone_Administrador.id_Administrador
                inner join tbl_Telefone on tbl_Telefone.id = tbl_Telefone_Administrador.id_Telefone
                    set tbl_Administrador.Nome = '${json.nome}', tbl_Administrador.Email = '${json.email}', tbl_Administrador.senha = md5('${json.senha}'),
                    tbl_Administrador.Usuario = '${json.usuario}',
                    tbl_Telefone.DDD = ${telefone.ddd}, tbl_Telefone.Telefone = '${telefone.telefone}'
                where tbl_Administrador.id = ${json.id}`

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

const deleteAdm = async function(id){

    let sql = `delete tbl_Administrador, tbl_Telefone, tbl_Telefone_Administrador
                from Tbl_Telefone_Administrador
                inner join tbl_Administrador
                    on tbl_Administrador.id = tbl_Telefone_Administrador.id_Administrador
                inner join tbl_Telefone
                    on tbl_Telefone.id = tbl_Telefone_Administrador.id_Telefone
                where tbl_Administrador.id = ${id};`
                
        const result = await prisma.$queryRawUnsafe(sql)
    
    try{    
        if(result)
            return true
        else
            return false
    } 
    catch(error) {
        return false
    }
}

const selectAllAdm = async function () {
    try {
        const rsAdm = await prisma.$queryRaw`select * from tbl_Administrador`
        
        if (rsAdm.length > 0)
            return rsAdm
        else 
            return false
    } 
    catch (error) {
        return false
    }
}

const findAdm = async function (id) {

    let sql = `select tbl_Administrador.id, tbl_Administrador.nome, tbl_Administrador.email, tbl_Administrador.usuario, tbl_Telefone.DDD as ddd_telefone, tbl_Telefone.telefone
        from tbl_Administrador
        inner join tbl_Telefone_Administrador
            on tbl_Administrador.id = tbl_Telefone_Administrador.id_Administrador
        inner join tbl_Telefone
            on tbl_Telefone.id = tbl_Telefone_Administrador.id_Telefone
        where tbl_Administrador.id = ${id}`

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

const findAdmName = async function (name) {

    let sql = `select * from tbl_Administrador where nome like '%${name}%'`

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

const login = async function (json) {
    let sql = `select id from tbl_Administrador where Usuario = '${json.usuario}' and Senha = md5('${json.senha}')`

    try {
        const rsAdm = await prisma.$queryRawUnsafe(sql)

        if (rsAdm.length > 0)
            return rsAdm
        else
            return false
    }
    catch(error) {
        return false
    }
}

const selectLastId = async function(){

    let sql = `select id from tbl_Administrador order by id desc limit 1`

    try{    
        const rsAdm = await prisma.$queryRawUnsafe(sql)
        if(rsAdm.length > 0) {
            return rsAdm[0].id
        } else {
            return false
        }
    } catch{ 
        return false
    }
}

module.exports = {
    selectAllAdm, insertAdm, deleteAdm, putAdm, selectLastId, findAdm, login, findAdmName
}
