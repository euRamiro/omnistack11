const knex = require('knex');
const configuration = require('../../knexfile');

//config recebe caminho de conexão do banco
// test ou produção
const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development

const connection = knex(config);

module.exports = connection;