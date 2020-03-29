const express = require('express');
const cors = require('cors');
const { errors }  = require('celebrate');
const routes = require('./routes.js');

const app = express();

//utliza CORS
app.use(cors());
//informando que será utilizado o JSON na requisição
app.use(express.json());
app.use(routes);
//retorna o erro gerado quando o parametro é barrado pelo validador em routes
app.use(errors());

module.exports = app;

/*
    Rota e Recurso
*/
/**
*Métodos HTTP:
GET: Bucar informação do back-end
POST: Criar informação no back-end
PUT: ALterar uma informação no back-end
DELETE: Deletar uma informação no back-end
**/

/**
 * Tipos de Parâmetros:
 * 
 * Query Params: Parâmetros nomeados enviados na roda após '?' (filtros, paginação) etc
 * Route Params: Parâmetros utilizados para identificar recursos
 * Request Body: 
 */

/**
 * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
 * NoSQL: MongoDB, CouchDB, etc
 * 
 * Banco utilizado: SQLite
 * Driver: SELECT * FROM USERS
 * Query Builder: table('users').select('*').where() = knexjs
 */