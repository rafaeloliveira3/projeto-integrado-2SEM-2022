const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const createPizzaSabor = async function (json) {
    let sabor = json.sabor
    let result

    try {
        sabor.forEach(async (item) => {
            let sql = `insert into tbl_Pizza_Sabor (id_Pizza, id_Sabor)
                        values (${json.id}, ${item})`
            
            result = await prisma.$executeRawUnsafe(sql)
        })

        if (result) 
            return true
        else 
            return false
    }
    catch (error) {
        return false
    }
}
const createPizzaCategoria= async function (json) {
    let categoria = json.categoria
    let result

    try {
        categoria.forEach(async (item) => {
            let sql = `insert into tbl_Categoria_Tipo_Pizza (id_Pizza, id_Categoria_Tipo)
                        values (${json.id}, ${item})`

            result = await prisma.$executeRawUnsafe(sql)
        })

        if (result) 
            return true
        else 
            return false
    }
    catch (error) {
        console.log(error)
        return false
    }
}

module.exports = {
    createPizzaSabor,
    createPizzaCategoria
}