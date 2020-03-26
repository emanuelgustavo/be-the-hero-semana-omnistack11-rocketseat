const express = require('express');

const ongController = require('./controllers/ongController.js');
const incidentController = require('./controllers/incidentController.js');
const profileController = require('./controllers/profileController.js');
const sessionsController = require('./controllers/sessionController');

const routes = express.Router();

//rota de login da ong
routes.post('/sessions', sessionsController.create);

//rota para o controller que lista as ongs
routes.get('/ongs', ongController.index);
//rota para o controller que cadastra uma ong
routes.post('/ongs', ongController.create);

//rota para o controller que lista as incidents
routes.get('/incidents', incidentController.index);
//rota para o controller que cadastra uma incident
routes.post('/incidents', incidentController.create);
//rota para deletar um incident
routes.delete('/incidents/:id', incidentController.delete);

//rota para listagem de todos os casos de uma ong especifica
routes.get('/profile', profileController.index);



module.exports = routes;