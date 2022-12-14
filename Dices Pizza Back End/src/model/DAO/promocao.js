/********************************************
* Objetivo: Arquivo responsável pela manipulação de dados com o BD (Insert, Update, Select, Delete) da tabela de Promoc
ção
* Autor: Gyovanne Martins e Rafael Oliveira
* Data criação: 21/11/2022
* Versão: 1.0
********************************************/

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const selectAllPromocaes = async function () {

    let sql = `select   tbl_promocao.id, tbl_promocao.descricao as descricao_Promocao, tbl_promocao.desconto as desconto_Promocao, 
    tbl_formato.nome as nome_Formato_Promocao, tbl_formato.id as id_formato,
    tbl_Pizza.nome as nome_Pizza,
    tbl_Bebida.nome as nome_Bebida,
    tbl_Servico.nome as nome_Servico

    from tbl_promocao
        inner join tbl_Formato
            on tbl_Formato.id = tbl_promocao.id_Formato_Promocao
        left join tbl_Promocao_Pizza
            on tbl_Promocao.id = tbl_Promocao_Pizza.id_Promocao
        left join tbl_Pizza
            on tbl_Pizza.id = tbl_Promocao_Pizza.id_pizza

        #Fim da pizza

        left join tbl_Promocao_Bebida
            on tbl_Promocao.id = tbl_Promocao_Bebida.id_Promocao
        left join tbl_Bebida
            on tbl_bebida.id = tbl_Promocao_Bebida.id_Bebida
        #Fim da bebida
        left join tbl_Promocao_Servico
            on tbl_Promocao.id = tbl_Promocao_Servico.id_Promocao
        left join tbl_Servico
            on tbl_Servico.id = tbl_Promocao_Servico.id_Servico;`

    try {
        const rsPromocaos = await prisma.$queryRawUnsafe(sql)
        
        if (rsPromocaos.length > 0)
            return rsPromocaos
        else 
            return false
    } 
    catch (error) {
        return false
    }
}

const findPromocao = async function (id) {
    let sql = `select tbl_promocao.id, tbl_promocao.descricao as descricao_Promocao, tbl_promocao.desconto as desconto_Promocao, 
    tbl_formato.nome as nome_Formato_Promocao, tbl_formato.id as id_formato,
    tbl_Pizza.nome as nome_Pizza,
    tbl_Bebida.nome as nome_Bebida,
    tbl_Servico.nome as nome_Servico

    from tbl_promocao
        inner join tbl_Formato
            on tbl_Formato.id = tbl_promocao.id_Formato_Promocao
        left join tbl_Promocao_Pizza
            on tbl_Promocao.id = tbl_Promocao_Pizza.id_Promocao
        left join tbl_Pizza
            on tbl_Pizza.id = tbl_Promocao_Pizza.id_pizza

        #Fim da pizza

        left join tbl_Promocao_Bebida
            on tbl_Promocao.id = tbl_Promocao_Bebida.id_Promocao
        left join tbl_Bebida
            on tbl_bebida.id = tbl_Promocao_Bebida.id_Bebida

        #Fim da bebida
        
        left join tbl_Promocao_Servico
            on tbl_Promocao.id = tbl_Promocao_Servico.id_Promocao
        left join tbl_Servico
            on tbl_Servico.id = tbl_Promocao_Servico.id_Servico where tbl_Promocao.id = ${id}`

    try {
        const rsPromocaos = await prisma.$queryRawUnsafe(sql)
        if (rsPromocaos.length > 0)
            return rsPromocaos
        else
            return false
    }
    catch (error) {
        return false
    }
}

const updatePromocao = async function (json){

    try {

        let sql = `update tbl_promocao set 
                        Descricao = '${json.descricao}',
                        Desconto = ${json.desconto},
                        id_Formato_Promocao = ${json.formato}
                   where id = ${json.id}`

        const result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        } else {
            return false
        }
    } 
    catch(error) {
        return false
    }
}

const findPromocaoDescription = async function (description) {
 
    let sql = `select * from tbl_Promocao where Descricao like '%${description}%'`

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

const deletePromocao = async function (id){

    sql = `delete tbl_Promocao_Pizza, tbl_Promocao_Bebida, tbl_Promocao_Servico
            from tbl_Promocao
                left join tbl_Promocao_Pizza
                    on tbl_Promocao.id = tbl_Promocao_Pizza.id_Promocao
                left join tbl_Promocao_Bebida
                    on tbl_Promocao.id = tbl_Promocao_Bebida.id_Promocao
                left join tbl_Promocao_Servico
                    on tbl_Promocao.id = tbl_Promocao_Servico.id_Promocao    
                where tbl_Promocao.id = ${id}`
    
    try{    
        const result = await prisma.$executeRawUnsafe(sql)
 
        if(result){
            let deletesql = await prisma.$executeRaw`delete from tbl_Promocao where id = ${id}`
            
            if(deletesql){
                return true
            } else{
                return false
            }
            
        }else
            return false
    } 
    catch(error){
        return false
    }
}

const insertPromocao = async function (json){
    try {
        let Promocao = json
        console.log(json);
        let sql = `insert into tbl_Promocao(Descricao, Desconto, id_Formato_Promocao) values('${Promocao.descricao}', ${Promocao.desconto}, ${Promocao.formato})`
        console.log(sql);

        const result = await prisma.$executeRawUnsafe(sql)    
        console.log(result);
        if(result){
            return true
        } else {
            return false
        }
    } catch(error) {
        console.log(error);
        return false
    }
}

const selectLastId = async function(){

    let sql = `select id from tbl_Promocao order by id desc limit 1`

    try{    
        const rsPromocao = await prisma.$queryRawUnsafe(sql)
        if(rsPromocao.length > 0) {
            return rsPromocao[0].id
        } else {
            return false
        }
    } catch(error){
       
        return false
    }
}

module.exports = {
    selectAllPromocaes, 
    insertPromocao, 
    updatePromocao, 
    findPromocao,
    deletePromocao,
    selectLastId,
    findPromocaoDescription
}