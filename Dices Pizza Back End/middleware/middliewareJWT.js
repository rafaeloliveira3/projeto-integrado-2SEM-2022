//Import da biblioteca 

const jwt = require('jsonwebtoken') 

//Chave secreta para a criação do JWT 

const SECRET = 'ChaveJWTPizzaTemQueSerSecreta!!!!' 

//Tempo para espiração 

const EXPIRES= 3600 

 

//Criação de um token 

const createJWT = async function (payLoad){ 

	//Gera o Token 

		//payLoad - a indentificação do usuário autenticado 

		//SECRET - a chave secreta 

		//expiresign - tempo de expiração do token  

	const token = jwt.sign({userId: payLoad}, SECRET, {expiresIn: EXPIRES}) 

	return token; 

} 

//Validção de um token 

const validacaoJWT = async function (token){//Valida a autenticidade do token  

	let status  

	jwt.verify(token, SECRET, async function (err, decode){ 
		console.log(decode);
        if (!err) 
            status =  true 
        else 
            status = false 
    }) 

	return status 

} 

 

module.exports = { 
	createJWT, 
    validacaoJWT 
} 