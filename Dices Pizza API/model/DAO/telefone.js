/********************************************
* Objetivo: Arquivo responsável pela manipulação de dados com o BD (Insert, Update, Select, Delete) dos dados relacionados a Telefone
* Autor: Gyovanne Martins Rafael Oliveira
* Data criação: 28/11/2022
* Versão: 1.0
********************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const insertTelforAdmins = async function (telefone){
    try {
        let sql = `insert into tbl_Telefone(DDD, Telefone, id_Formato_Telefone) values(${telefone.ddd}, '${telefone.telefone}', ${telefone.formato});`
        const result = await prisma.$queryRawUnsafe(sql)    
        
        await insertTelAdm()

        if(result){
            return true
        } else {
            return false
        }
    } catch(error) {
        return false
    }
}

const insertTelforClients = async function (telefone){
       try {
        let sql = `insert into tbl_Telefone(DDD, Telefone, id_Formato_Telefone) values(${telefone.ddd}, '${telefone.telefone}', ${telefone.formato});`
        const result = await prisma.$queryRawUnsafe(sql)    
        
        await insertTelClient()

        if(result){
            return true
        } else {
            return false
        }
    } catch(error) {
        return false
    }
}

const selectLastPhoneId = async function () {
    let sql = `select id from tbl_Telefone order by id desc limit 1`

    try{    
        const rsTelefone = await prisma.$queryRawUnsafe(sql)
        if(rsTelefone.length > 0) {
            return rsTelefone[0].id
        } else {
            return false
        }
    } catch{ 
        return false
    }
}

const insertTelAdm = async function () {

    const { selectLastId } = require('./adm.js')


    const idTelefone = await selectLastPhoneId()
    const idAdm = await selectLastId()

    let sql = `insert into tbl_Telefone_Administrador (id_Administrador, id_Telefone)
    values (${idAdm}, ${idTelefone})`
  
    try {
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

const insertTelClient = async function () {

    const { selectLastId } = require('./cliente.js')


    const idTelefone = await selectLastPhoneId()
    const idCliente = await selectLastId()
        
    let sql = `insert into tbl_Telefone_Cliente (id_Cliente, id_Telefone)
    values (${idCliente}, ${idTelefone})`
  
    try {
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

const findTelClient = async function (id) {

    let sql = `select tbl_Telefone.ddd as DDD_Telefone, tbl_Telefone.Telefone, tbl_Formato_Telefone.Formato as Formato_Telefone 
                    from tbl_Telefone
               inner join tbl_Telefone_Cliente
                    on tbl_Telefone_Cliente.id_Telefone = tbl_Telefone.id 
               inner join tbl_Formato_Telefone
                    on tbl_Telefone.id_Formato_Telefone = tbl_Formato_Telefone.id
               where tbl_Telefone_Cliente.id_Cliente = ${id} order by tbl_Formato_Telefone.Formato`

    try{    
        const rsTelefone = await prisma.$queryRawUnsafe(sql)

        if(rsTelefone.length > 0) {
            return rsTelefone
        } else {
            return false
        }
    } catch{ 
        return false
    }
}

const deleteTels = async function(id) {
    
    let sql = `delete tbl_Telefone, tbl_Telefone_Cliente
                from Tbl_Telefone_Cliente
                inner join tbl_Cliente
                    on tbl_Cliente.id = tbl_Telefone_Cliente.id_Cliente
                inner join tbl_Telefone
                    on tbl_Telefone.id = tbl_Telefone_Cliente.id_Telefone
                where tbl_Cliente.id = ${id}`

    try{    
        const rsTelefone = await prisma.$executeRawUnsafe(sql)

        if(rsTelefone) {
            return rsTelefone
        } else {
            return false
        }
    } catch{ 
        return false
    }
}

module.exports = {
    insertTelforAdmins,
    insertTelforClients,
    selectLastPhoneId,
    insertTelAdm,
    insertTelClient,
    findTelClient,
    deleteTels
}