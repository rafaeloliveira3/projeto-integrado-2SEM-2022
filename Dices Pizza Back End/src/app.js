/************************************************************
    * Objetivo: API responsável pelo crud dos dados de uma 
        pizzaria
 * Data: 21/11/2022
 * Autores: Rafael Oliveira e Gyovanne Martins
 * Versão: 1.0
************************************************************/

const express = require('express')
const cors = require('cors')

const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('./modules/config.js')
const app = express()
const router = express.Router()

const jsonParser = express.json()

/* Configuração de Permições e Acesso */

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')

    app.use(cors())
    next()
})

const verifyJWT = async function (request, response, next){ 

    let token = request.headers['x-access-token'] 

    const jwt = require('../middleware/middliewareJWT.js') 
    
    const autenticidadeToken = await jwt.validacaoJWT(token)
    
    
    if(autenticidadeToken){
        next() 
    }
    else  
        return response.status(401).end() 
    
    } 

/* 
    Endpoints - CRUD de Serviços
    Data: 23/11/2022 
*/

app.get('/v1/servico', cors(), async function (req, res) {
    let statusCode
    let message

    const { listServices } = require('./controller/controllerServicos.js')

    const dadosServicos = await listServices()

    if (dadosServicos) {
        statusCode = 200
        message = dadosServicos
    }
    else {
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.get('/v1/servico/:id', cors(), async function (req, res) {
    let id = req.params.id
    let statusCode
    let message



    if (id != '' && id != undefined) {
        const { findServices } = require('./controller/controllerServicos.js')
        const dadosServico = await findServices(id)

        if (dadosServico) {
            statusCode = 200
            message = dadosServico
        }
        else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)
    
    res.status(statusCode)
    res.json(message)
})

app.get('/v1/admin/servico/', cors(), async function (req, res) {
    let servico = req.query.servico
    let statusCode
    let message

    if (servico != '' && servico != undefined) {
        const { findServicesByName } = require('./controller/controllerServicos.js')
        const dadosServico = await findServicesByName(servico)

        if (dadosServico) {
            statusCode = 200
            message = dadosServico
        }
        else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_FIELDS
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)
    
    res.status(statusCode)
    res.json(message)
})

app.post('/v1/admin/servico', cors(), jsonParser, async function (req, res) {
    let statusCode
    let message
    let contentType


    contentType = req.headers['content-type']

    if (contentType == 'application/json') {
        let dadosBody = req.body
        if (JSON.stringify(dadosBody) != '{}') {
            const { insertServices } = require('./controller/controllerServicos.js')
            const novoServico = await insertServices(dadosBody)

            statusCode = novoServico.status
            message = novoServico.message
        }
        else {
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    } 
    else {
        statusCode = 400
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.put('/v1/admin/servico/:id', cors(), jsonParser, async function (req, res) {
    let statusCode
    let message
    let contentType


    contentType = req.headers['content-type']
    
    if (contentType == 'application/json') {
        let dadosBody = req.body
        
        if(JSON.stringify(dadosBody) != '{}') {
            let id = req.params.id

            if (id != '' && id != undefined) {
                dadosBody.id = id
                const { updateServices } = require('./controller/controllerServicos.js')
                const service = await updateServices(dadosBody)

                statusCode = service.status
                message = service.message
            }
            else {
                statusCode = 400
                message = MESSAGE_ERROR.REQUIRED_ID
            }
        }
        else {
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    } 
    else {
        statusCode = 400
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.delete('/v1/admin/servico/:id', cors(), async function (req, res) {
    let statusCode
    let message
    const id = req.params.id

    if(id != '' && id != undefined) {
        const { deleteServices } = require ('./controller/controllerServicos.js')
    
        const deleted = await deleteServices(id)
    
        statusCode = deleted.status
        message = deleted.message
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

/* 
    Endpoints - CRUD de Adms
    Data: 23/11/2022 
*/

app.get('/v1/adm', cors(), async function (req, res) {
    let statusCode
    let message

    const { listAdm } = require('./controller/controllerAdm.js')

    const dadosAdm = await listAdm()

    if (dadosAdm) {
        statusCode = 200
        message = dadosAdm
    }
    else {
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.get('/v1/adm/', cors(), async function (req, res) {
    let admin = req.query.admin
    let statusCode
    let message

    if (admin != '' && admin != undefined) {
        const { searchByName } = require('./controller/controllerAdm.js')
        const dadosAdm = await searchByName(admin)

        if (dadosAdm) {
            statusCode = 200
            message = dadosAdm
        }
        else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)
    
    res.status(statusCode)
    res.json(message)
})

app.get('/v1/adm/:id', cors(), async function (req, res) {
    let id = req.params.id
    let statusCode
    let message

    if (id != '' && id != undefined) {
        const { searchAdm } = require('./controller/controllerAdm.js')
        const dadosAdm = await searchAdm(id)

        if (dadosAdm) {
            statusCode = 200
            message = dadosAdm
        }
        else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)
    
    res.status(statusCode)
    res.json(message)
})

app.post('/v1/adm', cors(), jsonParser, async function (req, res) {
    let statusCode
    let message
    let contentType

    contentType = req.headers['content-type']

    if (contentType == 'application/json') {
        let dadosBody = req.body
        if (JSON.stringify(dadosBody) != '{}') {
            const { insertAdms } = require('./controller/controllerAdm.js')
            const novoAdministrador = await insertAdms(dadosBody)

            statusCode = novoAdministrador.status
            message = novoAdministrador.message
        }
        else {
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    } 
    else {
        statusCode = 400
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.post('/v1/adm/login', cors(), jsonParser, async function (req, res) {
    let statusCode
    let message
    let contentType

    contentType = req.headers['content-type']

    if (contentType == 'application/json') {
        let dadosBody = req.body
        if (JSON.stringify(dadosBody) != '{}') {
            const { loginAdm } = require('./controller/controllerAdm.js')
            const loginAdmin = await loginAdm(dadosBody)

            statusCode = loginAdmin.status
            message = loginAdmin.message
        }
        else {
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    } 
    else {
        statusCode = 400
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.put('/v1/adm/:id', cors(), jsonParser, async function (req, res) {
    let statusCode
    let message
    let contentType

    contentType = req.headers['content-type']
    
    if (contentType == 'application/json') {
        let dadosBody = req.body
        
        if(JSON.stringify(dadosBody) != '{}') {
            let id = req.params.id

            if (id != '' && id != undefined) {
                dadosBody.id = id
                const { updateAdm } = require('./controller/controllerAdm.js')
                const adm = await updateAdm(dadosBody)

                statusCode = adm.status
                message = adm.message
            }
            else {
                statusCode = 400
                message = MESSAGE_ERROR.REQUIRED_ID
            }
        }
        else {
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    } 
    else {
        statusCode = 400
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.delete('/v1/adm/:id', cors(), async function (req, res) {
    let statusCode
    let message
    const id = req.params.id

    if(id != '' && id != undefined) {
        const { deleteAdms } = require ('./controller/controllerAdm.js')
    
        const deleted = await deleteAdms(id)
    
        statusCode = deleted.status
        message = deleted.message
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

/* 
    Endpoints - CRD de Clientes
    Data: 28/11/2022 
*/

app.get('/v1/admin/cliente', cors(), async function (req, res) {
    let statusCode
    let message
    
    const { listClient } = require('./controller/controllerClient.js')

    const client = await listClient()
 
    if (client) {
        statusCode = 200
        message = client
    }
    else {
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.get('/v1/admin/cliente/:id', cors(), async function (req, res) {

 
    let id = req.params.id
    let statusCode
    let message

    if (id != '' && id != undefined) {
        const { searchClient } = require('./controller/controllerClient.js')
        const dadosCliente = await searchClient(id)

        if (dadosCliente) {
            statusCode = 200
            message = dadosCliente
        }
        else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)
    
    res.status(statusCode)
    res.json(message)
})

app.get('/v1/admin/cliente/', cors(), async function (req, res) {
    let cliente = req.query.cliente
    let statusCode
    let message

    if (cliente != '' && cliente != undefined) {
        const { findClienteByName } = require('./controller/controllerClient.js')
        const dadosClient = await findClienteByName(cliente)

        if (dadosClient) {
            statusCode = 200
            message = dadosClient
        }
        else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)
    
    res.status(statusCode)
    res.json(message)
})

app.post('/v1/admin/cliente', cors(), jsonParser, async function (req, res) {
    let statusCode
    let message
    let contentType

    contentType = req.headers['content-type']

    if (contentType == 'application/json') {
        let dadosBody = req.body
        if (JSON.stringify(dadosBody) != '{}') {
            const { insertNewClient } = require('./controller/controllerClient.js')
            const novoCliente = await insertNewClient(dadosBody)

            statusCode = novoCliente.status
            message = novoCliente.message
        }
        else {
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    } 
    else {
        statusCode = 400
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.delete('/v1/admin/cliente/:id', cors(), async function (req, res) {
    let statusCode
    let message
    const id = req.params.id

    if(id != '' && id != undefined) {
        const { deleteClients } = require ('./controller/controllerClient.js')
    
        const deleted = await deleteClients(id)
    
        statusCode = deleted.status
        message = deleted.message
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})


/* 
    Endpoints - CRUD de Bebidas
    Data: 28/11/2022 
*/

app.get('/v1/bebidas', cors(), async function (req, res) {
    let statusCode
    let message
    
    const { listDrinks } = require('./controller/controllerBebidas.js')
    
    const dadosBebidas = await listDrinks()

    if (dadosBebidas) {
        statusCode = 200
        message = dadosBebidas
    }
    else {
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.get('/v1/bebida/:id', cors(), async function (req, res) {
    let id = req.params.id
    let statusCode
    let message

    if (id != '' && id != undefined) {
        const { findDrinks } = require('./controller/controllerBebidas.js')
        const dadosBebida = await findDrinks(id)

        if (dadosBebida) {
            statusCode = 200
            message = dadosBebida
        }
        else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)
    
    res.status(statusCode)
    res.json(message)
})

app.get('/v1/drink/', cors(), async function (req, res) {
    let bebida = req.query.bebida
    let statusCode
    let message

    if (bebida != '' && bebida != undefined) {
        const { findDrinksByName } = require('./controller/controllerBebidas.js')
        const dadosBebida = await findDrinksByName(bebida)
        if (dadosBebida) {
            statusCode = 200
            message = dadosBebida
        }
        else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)
    
    res.status(statusCode)
    res.json(message)
})

app.post('/v1/admin/bebida', cors(), jsonParser, async function (req, res) {
    let statusCode
    let message
    let contentType

    contentType = req.headers['content-type']

    if (contentType == 'application/json') {
        let dadosBody = req.body
        if (JSON.stringify(dadosBody) != '{}') {
            const { insertDrinks } = require('./controller/controllerBebidas.js')
            const novoBebida = await insertDrinks(dadosBody)

            statusCode = novoBebida.status
            message = novoBebida.message
        }
        else {
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    } 
    else {
        statusCode = 400
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.put('/v1/admin/bebida/:id', cors(), jsonParser, async function (req, res) {
    let statusCode
    let message
    let contentType

    contentType = req.headers['content-type']
    
    if (contentType == 'application/json') {
        let dadosBody = req.body
        
        if(JSON.stringify(dadosBody) != '{}') {
            let id = req.params.id

            if (id != '' && id != undefined) {
                dadosBody.id = id
                const { updateDrinks } = require('./controller/controllerBebidas.js')
                const service = await updateDrinks(dadosBody)

                statusCode = service.status
                message = service.message
            }
            else {
                statusCode = 400
                message = MESSAGE_ERROR.REQUIRED_ID
            }
        }
        else {
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    } 
    else {
        statusCode = 400
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.delete('/v1/admin/bebida/:id', cors(), async function (req, res) {
    let statusCode
    let message
    const id = req.params.id

    if(id != '' && id != undefined) {
        const { deleteDrinks } = require ('./controller/controllerBebidas.js')
    
        const deleted = await deleteDrinks(id)
    
        statusCode = deleted.status
        message = deleted.message
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

/* 
    Endpoints - CRUD de Categorias de Bebidas
    Data: 28/11/2022 
*/

app.get('/v1/bebidas/categorias', cors(), async function (req, res) {
    let statusCode
    let message

    const { listCategorias } = require('./controller/controllerCategoriaBebidas.js')

    const dadosCategorias = await listCategorias()

    if (dadosCategorias) {
        statusCode = 200
        message = dadosCategorias
    }
    else {
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.get('/v1/bebidas/categorias/:id', cors(), async function (req, res) {
    let id = req.params.id
    let statusCode
    let message

    if (id != '' && id != undefined) {
        const { findCategorias } = require('./controller/controllerCategoriaBebidas.js')
        const dadosCategorias = await findCategorias(id)

        if (dadosCategorias) {
            statusCode = 200
            message = dadosCategorias
        }
        else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)
    
    res.status(statusCode)
    res.json(message)
})

app.get('/v1/admin/bebida/categoria/', cors(), async function (req, res) {
    let catBebida = req.query.catBebida
    let statusCode
    let message

    if (catBebida != '' && catBebida != undefined) {
        const { findCategoriaDrinksByName } = require('./controller/controllerCategoriaBebidas.js')
        const dadosCategoriaBebida = await findCategoriaDrinksByName(catBebida)

        if (dadosCategoriaBebida) {
            statusCode = 200
            message = dadosCategoriaBebida
        }
        else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)
    
    res.status(statusCode)
    res.json(message)
})

app.post('/v1/admin/bebidas/categorias', cors(), jsonParser, async function (req, res) {
    let statusCode
    let message
    let contentType

    contentType = req.headers['content-type']

    if (contentType == 'application/json') {
        let dadosBody = req.body
        if (JSON.stringify(dadosBody) != '{}') {
            const { insertCategorias } = require('./controller/controllerCategoriaBebidas.js')
            const novaCategoria = await insertCategorias(dadosBody)

            statusCode = novaCategoria.status
            message = novaCategoria.message
        }
        else {
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    } 
    else {
        statusCode = 400
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.put('/v1/admin/bebidas/categorias/:id', cors(), jsonParser, async function (req, res) {
    let statusCode
    let message
    let contentType

    contentType = req.headers['content-type']
    
    if (contentType == 'application/json') {
        let dadosBody = req.body
        
        if(JSON.stringify(dadosBody) != '{}') {
            let id = req.params.id

            if (id != '' && id != undefined) {
                dadosBody.id = id
                const { updateCategoria } = require('./controller/controllerCategoriaBebidas.js')
                const categoria = await updateCategoria(dadosBody)

                statusCode = categoria.status
                message = categoria.message
            }
            else {
                statusCode = 400
                message = MESSAGE_ERROR.REQUIRED_ID
            }
        }
        else {
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    } 
    else {
        statusCode = 400
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.delete('/v1/admin/bebidas/categorias/:id', cors(), async function (req, res) {
    let statusCode
    let message
    const id = req.params.id

    if(id != '' && id != undefined) {
        const { deleteCategoria } = require ('./controller/controllerCategoriaBebidas')
    
        const deleted = await deleteCategoria(id)
    
        statusCode = deleted.status
        message = deleted.message
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

/* 
    Endpoints - CRUD de Pizzas
    Data: 30/11/2022 
*/

app.get('/v1/pizzas', cors(), async function (req, res) {
    let statusCode
    let message

    const { listPizza } = require('./controller/controllerPizza.js')

    const dadosPizzas = await listPizza()

    if (dadosPizzas) {
        statusCode = 200
        message = dadosPizzas
    }
    else {
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.get('/v1/favoritas/pizzas', cors(), async function (req, res) {
    let statusCode
    let message

    const { listFavorites } = require('./controller/controllerPizza.js')

    const dadosPizzas = await listFavorites()

    if (dadosPizzas) {
        statusCode = 200
        message = dadosPizzas
    }
    else {
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.get('/v1/pizzas/:id', cors(), async function (req, res) {
    let id = req.params.id
    let statusCode
    let message

    if (id != '' && id != undefined) {
        const { searchPizza } = require('./controller/controllerPizza.js')
        const dadosPizza = await searchPizza(id)
        
        if (dadosPizza) {
            statusCode = 200
            message = dadosPizza
        }
        else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)
    
    res.status(statusCode)
    res.json(message)
})

app.get('/v1/pizza/', cors(), async function (req, res) {
    let pizza = req.query.pizza
    let statusCode
    let message

    if (pizza != '' && pizza != undefined) {
        const { findPizzaByName } = require('./controller/controllerPizza.js')
        const dadosPizza = await findPizzaByName(pizza)

        if (dadosPizza) {
            statusCode = 200
            message = dadosPizza
        }
        else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)
    
    res.status(statusCode)
    res.json(message)
})

app.post('/v1/admin/pizza', cors(), jsonParser, async function (req, res) {
    let statusCode
    let message
    let contentType

    contentType = req.headers['content-type']

    if (contentType == 'application/json') {
        let dadosBody = req.body
        if (JSON.stringify(dadosBody) != '{}') {
            const { insertPizza } = require('./controller/controllerPizza.js')
            console.log(dadosBody);
            const novaPizza = await insertPizza(dadosBody)

            statusCode = novaPizza.status
            message = novaPizza.message
        }
        else {
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    } 
    else {
        statusCode = 400
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.delete('/v1/admin/pizza/:id', cors(), async function (req, res) {
    let statusCode
    let message
    const id = req.params.id

    if(id != '' && id != undefined) {
        const { deletePizzas } = require ('./controller/controllerPizza.js')
    
        const deleted = await deletePizzas(id)
    
        statusCode = deleted.status
        message = deleted.message
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.put('/v1/admin/pizza/:id', cors(), jsonParser, async function (req, res) {
    let statusCode
    let message
    let contentType

    contentType = req.headers['content-type']
    
    if (contentType == 'application/json') {
        let dadosBody = req.body
        
        if(JSON.stringify(dadosBody) != '{}') {
            let id = req.params.id

            if (id != '' && id != undefined) {
                dadosBody.id = id
                const { updatePizzas } = require('./controller/controllerPizza.js')
                const pizza = await updatePizzas(dadosBody)

                statusCode = pizza.status
                message = pizza.message
            }
            else {
                statusCode = 400
                message = MESSAGE_ERROR.REQUIRED_ID
            }
        }
        else {
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    } 
    else {
        statusCode = 400
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.put('/v1/favoritismo/pizza/:id', cors(), async function (req, res) {
    let statusCode
    let message
    const id = req.params.id

    if(id != '' && id != undefined) {
        const { favorite } = require ('./controller/controllerPizza.js')
    
        const adicionado = await favorite(id)
    
        statusCode = adicionado.status
        message = adicionado.message
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

/* 
    Endpoints - CRUD de Categorias de Pizzas
    Data: 30/11/2022 
*/

app.get('/v1/pizza/categorias', cors(), async function (req, res) {
    let statusCode
    let message

    const { listCategorias } = require('./controller/controllerCategoriaPizzas.js')

    const dadosCategorias = await listCategorias()

    if (dadosCategorias) {
        statusCode = 200
        message = dadosCategorias
    }
    else {
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.get('/v1/pizza/categorias/:id', cors(), async function (req, res) {
    let id = req.params.id
    let statusCode
    let message

    if (id != '' && id != undefined) {
        const { findCategorias } = require('./controller/controllerCategoriaPizzas.js')
        const dadosCategorias = await findCategorias(id)

        if (dadosCategorias) {
            statusCode = 200
            message = dadosCategorias
        }
        else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)
    
    res.status(statusCode)
    res.json(message)
})

app.get('/v1/admin/pizza/categorias/', cors(), async function (req, res) {
    let Catpizza = req.query.catPizza
    let statusCode
    let message

    if (Catpizza != '' && Catpizza != undefined) {
        const { findCategoriaPizzaByName } = require('./controller/controllerCategoriaPizzas.js')
        const dadosCategoriasPizza = await findCategoriaPizzaByName(Catpizza)

        if (dadosCategoriasPizza) {
            statusCode = 200
            message = dadosCategoriasPizza
        }
        else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)
    
    res.status(statusCode)
    res.json(message)
})

app.post('/v1/admin/pizza/categorias', cors(), jsonParser, async function (req, res) {
    let statusCode
    let message
    let contentType

    contentType = req.headers['content-type']

    if (contentType == 'application/json') {
        let dadosBody = req.body
        if (JSON.stringify(dadosBody) != '{}') {
            const { insertCategorias } = require('./controller/controllerCategoriaPizzas.js')
            console.log(dadosBody);
            const novaCategoria = await insertCategorias(dadosBody)

            statusCode = novaCategoria.status
            message = novaCategoria.message
        }
        else {
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    } 
    else {
        statusCode = 400
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.put('/v1/admin/pizza/categorias/:id', cors(), jsonParser, async function (req, res) {
    let statusCode
    let message
    let contentType

    contentType = req.headers['content-type']
    
    if (contentType == 'application/json') {
        let dadosBody = req.body
        
        if(JSON.stringify(dadosBody) != '{}') {
            let id = req.params.id

            if (id != '' && id != undefined) {
                dadosBody.id = id
                const { updateCategoria } = require('./controller/controllerCategoriaPizzas.js')
                const categoria = await updateCategoria(dadosBody)

                statusCode = categoria.status
                message = categoria.message
            }
            else {
                statusCode = 400
                message = MESSAGE_ERROR.REQUIRED_ID
            }
        }
        else {
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    } 
    else {
        statusCode = 400
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.delete('/v1/admin/pizza/categorias/:id', cors(), async function (req, res) {
    let statusCode
    let message
    const id = req.params.id

    if(id != '' && id != undefined) {
        const { deleteCategoria } = require ('./controller/controllerCategoriaPizzas.js')
    
        const deleted = await deleteCategoria(id)
    
        statusCode = deleted.status
        message = deleted.message
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})


/* 
    Endpoints - CRUD de Promoções
    Data: 30/11/2022 
*/

app.get('/v1/promocoes', cors(), async function (req, res) {
    let statusCode
    let message

    const { listPromocoes } = require('./controller/controllerPromocao.js')

    const dadosPromocao = await listPromocoes()

    if (dadosPromocao) {
        statusCode = 200
        message = dadosPromocao
    }
    else {
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.get('/v1/promotion/id/:id', cors(), async function (req, res) {
    let id = req.params.id
    let statusCode
    let message

    if (id != '' && id != undefined) {
        const { findPromocao } = require('./controller/controllerPromocao.js')
        const dadosPromocao = await findPromocao(id)

        if (dadosPromocao) {
            statusCode = 200
            message = dadosPromocao
        }
        else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)
    
    res.status(statusCode)
    res.json(message)
})

app.get('/v1/admin/promotion/', cors(), async function (req, res) {
    let promocao = req.query.promocao
    let statusCode
    let message

    if (promocao != '' && promocao != undefined) {
        const { findPromocaoByDescription } = require('./controller/controllerPromocao.js')
        const dadosPizza = await findPromocaoByDescription(promocao)

        if (dadosPizza) {
            statusCode = 200
            message = dadosPizza
        }
        else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)
    
    res.status(statusCode)
    res.json(message)
})

app.post('/v1/admin/promocao', cors(), jsonParser, async function (req, res) {
    let statusCode
    let message
    let contentType

    contentType = req.headers['content-type']

    if (contentType == 'application/json') {
        let dadosBody = req.body
        console.log(dadosBody);
        if (JSON.stringify(dadosBody) != '{}') {
            const { insertPromocao } = require('./controller/controllerPromocao.js')
            console.log(dadosBody);
            const novaPromocao = await insertPromocao(dadosBody)

            statusCode = novaPromocao.status
            message = novaPromocao.message
        }
        else {
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    } 
    else {
        statusCode = 400
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.put('/v1/admin/promocao/:id', cors(), jsonParser, async function (req, res) {
    let statusCode
    let message
    let contentType

    contentType = req.headers['content-type']
    
    if (contentType == 'application/json') {
        let dadosBody = req.body
        
        if(JSON.stringify(dadosBody) != '{}') {
            let id = req.params.id

            if (id != '' && id != undefined) {
                dadosBody.id = id
                const { updatePromocoes } = require('./controller/controllerPromocao.js')
                const categoria = await updatePromocoes(dadosBody)

                statusCode = categoria.status
                message = categoria.message
            }
            else {
                statusCode = 400
                message = MESSAGE_ERROR.REQUIRED_ID
            }
        }
        else {
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    } 
    else {
        statusCode = 400
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.delete('/v1/admin/promocao/:id', cors(), async function (req, res) {
    let statusCode
    let message
    const id = req.params.id

    if(id != '' && id != undefined) {
        const { deletePromocao } = require ('./controller/controllerPromocao.js')
    
        const deleted = await deletePromocao(id)
    
        statusCode = deleted.status
        message = deleted.message
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

/* 
    Endpoints - CRUD de Sabores de Pizzas
    Data: 1/12/2022 
*/

app.get('/v1/pizza/sabor', cors(), async function (req, res) {
    let statusCode
    let message

    const { listSabor } = require('./controller/controllerSabor.js')

    const dadosSabor = await listSabor()

    if (dadosSabor) {
        statusCode = 200
        message = dadosSabor
    }
    else {
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.get('/v1/pizza/sabor/:id', cors(), async function (req, res) {
    let id = req.params.id
    let statusCode
    let message

    if (id != '' && id != undefined) {
        const { findSabor } = require('./controller/controllerSabor.js')
        const dadosSabor = await findSabor(id)

        if (dadosSabor) {
            statusCode = 200
            message = dadosSabor
        }
        else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)
    
    res.status(statusCode)
    res.json(message)
})

app.get('/v1/admin/pizza/sabor/', cors(), async function (req, res) {
    let saborPizza = req.query.saborPizza
    let statusCode
    let message

    if (saborPizza != '' && saborPizza != undefined) {
        const { findSaborPizzaByName } = require('./controller/controllerSabor.js')
        const dadosPizza = await findSaborPizzaByName(saborPizza)

        if (dadosPizza) {
            statusCode = 200
            message = dadosPizza
        }
        else {
            statusCode = 404
            message = MESSAGE_ERROR.NOT_FOUND_DB
        }
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)
    
    res.status(statusCode)
    res.json(message)
})

app.post('/v1/admin/pizza/sabor', cors(), jsonParser, async function (req, res) {
    let statusCode
    let message
    let contentType

    contentType = req.headers['content-type']

    if (contentType == 'application/json') {
        let dadosBody = req.body
        if (JSON.stringify(dadosBody) != '{}') {
            const { insertSabor } = require('./controller/controllerSabor.js')
            const novoSabor = await insertSabor(dadosBody)

            statusCode = novoSabor.status
            message = novoSabor.message
        }
        else {
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    } 
    else {
        statusCode = 400
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.put('/v1/admin/pizza/sabor/:id', cors(), jsonParser, async function (req, res) {
    let statusCode
    let message
    let contentType

    contentType = req.headers['content-type']
    
    if (contentType == 'application/json') {
        let dadosBody = req.body
        
        if(JSON.stringify(dadosBody) != '{}') {
            let id = req.params.id

            if (id != '' && id != undefined) {
                dadosBody.id = id
                const { updateSabor } = require('./controller/controllerSabor.js')
                const sabor = await updateSabor(dadosBody)

                statusCode = sabor.status
                message = sabor.message
            }
            else {
                statusCode = 400
                message = MESSAGE_ERROR.REQUIRED_ID
            }
        }
        else {
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    } 
    else {
        statusCode = 400
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.delete('/v1/admin/pizza/sabor/:id', cors(), async function (req, res) {
    let statusCode
    let message
    const id = req.params.id

    if(id != '' && id != undefined) {
        const { deleteSabor } = require ('./controller/controllerSabor.js')
    
        const deleted = await deleteSabor(id)
    
        statusCode = deleted.status
        message = deleted.message
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

/* 
    Endpoints - "CRUD" do interligamento entre promoções e pizza
    Data: 1/12/2022 
*/

app.get('/v1/promo/pizza', cors(), async function (req, res) {
    let statusCode
    let message

    const { listPromocoesPizzas } = require('./controller/controllerPromocaoPizza.js')

    const dadosSabor = await listPromocoesPizzas()

    if (dadosSabor) {
        statusCode = 200
        message = dadosSabor
    }
    else {
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)
    console.log(statusCode);
    res.status(statusCode)
    res.json(message)
})

app.post('/v1/admin/promo/pizza', cors(), jsonParser, async function (req, res) {
    let statusCode
    let message
    let contentType

    contentType = req.headers['content-type']

    if (contentType == 'application/json') {
        let dadosBody = req.body
        if (JSON.stringify(dadosBody) != '{}') {
            const { insertPromocaoPizza } = require('./controller/controllerPromocaoPizza.js')
            const novoSabor = await insertPromocaoPizza(dadosBody)

            statusCode = novoSabor.status
            message = novoSabor.message
        }
        else {
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    } 
    else {
        statusCode = 400
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.delete('/v1/admin/promo/pizza/:id', cors(), jsonParser, async function (req, res) {
    let statusCode
    let message
    const id = req.params.id

    if(id != '' && id != undefined) {
        const { deletePromocaoPizza } = require ('./controller/controllerPromocaoPizza.js')
    
        const deleted = await deletePromocaoPizza(id)
    
        statusCode = deleted.status
        message = deleted.message
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

/* 
    Endpoints - "CRUD" do interligamento entre promoções e Bebida
    Data: 1/12/2022 
*/

app.get('/v1/promo/bebida', cors(), async function (req, res) {
    let statusCode
    let message

    const { listPromocoesBebidas } = require('./controller/controllerPromocaoBebida.js')

    const dadosSabor = await listPromocoesBebidas()

    if (dadosSabor) {
        statusCode = 200
        message = dadosSabor
    }
    else {
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.post('/v1/admin/promo/bebida', cors(), jsonParser, async function (req, res) {
    let statusCode
    let message
    let contentType

    contentType = req.headers['content-type']

    if (contentType == 'application/json') {
        let dadosBody = req.body
        if (JSON.stringify(dadosBody) != '{}') {
            const { insertPromocaoBebida } = require('./controller/controllerPromocaoBebida.js')
            const novoSabor = await insertPromocaoBebida(dadosBody)

            statusCode = novoSabor.status
            message = novoSabor.message
        }
        else {
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    } 
    else {
        statusCode = 400
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.delete('/v1/admin/promo/bebida/:id', cors(), jsonParser, async function (req, res) {
    let statusCode
    let message
    const id = req.params.id

    if(id != '' && id != undefined) {
        const { deletePromocaoBebida } = require ('./controller/controllerPromocaoBebida.js')
    
        const deleted = await deletePromocaoBebida(id)
    
        statusCode = deleted.status
        message = deleted.message
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

/* 
    Endpoints - "CRUD" do interligamento entre promoções e Serviço
    Data: 1/12/2022 
*/

app.get('/v1/promo/servico', cors(), async function (req, res) {
    let statusCode
    let message

    const { listPromocoesServicos } = require('./controller/controllerPromocaoServico.js')

    const dadosSabor = await listPromocoesServicos()

    if (dadosSabor) {
        statusCode = 200
        message = dadosSabor
    }
    else {
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.post('/v1/admin/promo/servico', cors(), jsonParser, async function (req, res) {
    let statusCode
    let message
    let contentType

    contentType = req.headers['content-type']

    if (contentType == 'application/json') {
        let dadosBody = req.body
        if (JSON.stringify(dadosBody) != '{}') {
            const { insertPromocaoServico } = require('./controller/controllerPromocaoServico.js')
            const novoSabor = await insertPromocaoServico(dadosBody)

            statusCode = novoSabor.status
            message = novoSabor.message
        }
        else {
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    } 
    else {
        statusCode = 400
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.delete('/v1/admin/promo/servico/:id', cors(), jsonParser, async function (req, res) {
    let statusCode
    let message
    const id = req.params.id

    if(id != '' && id != undefined) {
        const { deletePromocaoServico } = require ('./controller/controllerPromocaoServico.js')
    
        const deleted = await deletePromocaoServico(id)
    
        statusCode = deleted.status
        message = deleted.message
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

/* 
    Endpoints - "CRUD" do interligamento entre promoções e pizza por categoria
    Data: 1/12/2022 
*/

app.get('/v1/promo/pizza/categoria', cors(), async function (req, res) {
    let statusCode
    let message

    const { listPromocoesPizzasPorCategoria } = require('./controller/controllerPromocaoPizzaCategoria.js')

    const dadosPizzaCategoria = await listPromocoesPizzasPorCategoria()

    if (dadosPizzaCategoria) {
        statusCode = 200
        message = dadosPizzaCategoria
    }
    else {
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.post('/v1/admin/promo/pizza/categoria', cors(), jsonParser, async function (req, res) {
    let statusCode
    let message
    let contentType

    contentType = req.headers['content-type']

    if (contentType == 'application/json') {
        let dadosBody = req.body

        if (JSON.stringify(dadosBody) != '{}') {
            const { insertPromocaoPizzaPorCategoria } = require('./controller/controllerPromocaoPizzaCategoria.js')
            const dadosPizzaCategoria = await insertPromocaoPizzaPorCategoria(dadosBody)
            

            statusCode = dadosPizzaCategoria.status
            message = dadosPizzaCategoria.message
        }
        else {
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    } 
    else {
        statusCode = 400
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.delete('/v1/admin/promo/pizza/categoria/:id', cors(), jsonParser, async function (req, res) {
    let statusCode
    let message
    const id = req.params.id

    if(id != '' && id != undefined) {
        const { deletePromocaoPizzaPorCategoria } = require ('./controller/controllerPromocaoPizzaCategoria.js')
    
        const deleted = await deletePromocaoPizzaPorCategoria(id)
    
        statusCode = deleted.status
        message = deleted.message
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

/* 
    Endpoints - "CRUD" do interligamento entre promoções e pizza por sabor
    Data: 6/12/2022 
*/

app.get('/v1/promo/pizza/sabor', cors(), async function (req, res) {
    let statusCode
    let message

    const { listPromocoesPizzasPorSabor } = require('./controller/controllerPromocaoPizzaSabor.js')

    const dadosPizzaSabor = await listPromocoesPizzasPorSabor()

    if (dadosPizzaSabor) {
        statusCode = 200
        message = dadosPizzaSabor
    }
    else {
        statusCode = 404
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.post('/v1/admin/promo/pizza/sabor', cors(), jsonParser, async function (req, res) {
    let statusCode
    let message
    let contentType

    contentType = req.headers['content-type']

    if (contentType == 'application/json') {
        let dadosBody = req.body
        if (JSON.stringify(dadosBody) != '{}') {
            const { insertPromocaoPizzaPorSabor } = require('./controller/controllerPromocaoPizzaSabor.js')
            const dadosPizzaSabor = await insertPromocaoPizzaPorSabor(dadosBody)
            

            statusCode = dadosPizzaSabor.status
            message = dadosPizzaSabor.message
        }
        else {
            statusCode = 400
            message = MESSAGE_ERROR.EMPTY_BODY
        }
    } 
    else {
        statusCode = 400
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.delete('/v1/admin/promo/pizza/sabor/:id', cors(), jsonParser, async function (req, res) {
    let statusCode
    let message
    const id = req.params.id

    if(id != '' && id != undefined) {
        const { deletePromocaoPizzaPorSabor } = require ('./controller/controllerPromocaoPizzaSabor.js')
    
        const deleted = await deletePromocaoPizzaPorSabor(id)
    
        statusCode = deleted.status
        message = deleted.message
    }
    else {
        statusCode = 400
        message = MESSAGE_ERROR.REQUIRED_ID
    }

    serverResponse(req.originalUrl, req.method, message, statusCode)

    res.status(statusCode)
    res.json(message)
})

app.listen(8080, function () {
    console.log('Servidor aguardando requisições')
})
// app.use('/.netlify/functions/api', app)

module.exports = app

const serverResponse = function (url, metodo, message, status) {
    console.log(`\nServer (${url}).. Method: ${metodo}\nReturned "${message}"\nWith a ${status} status!\n`)
}