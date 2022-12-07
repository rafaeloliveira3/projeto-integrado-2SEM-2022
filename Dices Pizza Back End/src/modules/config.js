/************************************************************
* Objetivo: Arquivo responsável pela configuração e padronização de
 variáveis, constantes e mensagens do sistema.
 * Autor: Rafael Oliveira e Gyovanne Martins
 * Data de Criação: 21/11/2022
 * Data de Modificação: 21/11/2022
 * Versão: 1.0
************************************************************/

const MESSAGE_ERROR = {
    REQUIRED_FIELDS : 'Existe(m) campo(s) obrigatórios que devem ser fornecidos(s)!',
    INVALID_EMAIL : 'O email fornecido é invalido!',
    CONTENT_TYPE : 'O cabeçalho da requisição não possuí um content-type válido [deve ser application/json]!',
    EMPTY_BODY : 'O body da requisição deve possuír conteúdo!',
    NOT_FOUND_DB : 'Não foram encontrados registros no Banco de Dados',
    INTERNAL_ERROR_DB : 'Não foi possível realizar a operação com o Banco de Dados',
    REQUIRED_ID : 'O id do registro é obrigatório nesse tipo de requisição'
}
const MESSAGE_SUCCESS = {
    INSERT_ITEM : 'Item criado com sucesso no Banco de Dados',
    UPDATE_ITEM : 'Item atualizado com sucesso no Banco de Dados',
    DELETE_ITEM : 'Item deletado com sucesso no Banco de Dados',
}

module.exports = {
    MESSAGE_ERROR, 
    MESSAGE_SUCCESS
}