const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const ongController = require('./controllers/ongController.js');
const incidentController = require('./controllers/incidentController.js');
const searchController = require('./controllers/searchController.js');
const sessionsController = require('./controllers/sessionController');
const volunteerController = require('./controllers/volunteerController.js');
const incidentsHistoryController = require('./controllers/incidentsHistoryController');
const dashboardController = require('./controllers/dashboardController.js');

const routes = express.Router();

//rota de login da ong
routes.post('/sessions', sessionsController.create);

//rota para o controller que lista as ongs
routes.get('/ongs', ongController.index);
//rota para o controller que cadastra uma ong
//celebrate para validar parametros
routes.post('/ongs',
  celebrate({ //validação de parametro Body
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.string().required().min(10).max(11),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2),
    })
  }),
  ongController.create
);
//rota para o controller que lista os voluntarios
routes.get('/volunteer', volunteerController.index);
//rota para o controller que cadastra um voluntario
routes.post('/volunteer',
  celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  })
}),volunteerController.create);

//rota para o controller que lista as incidents
routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}),incidentController.index);
//rota para o controller que cadastra uma incident
routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required().min(5),
      description: Joi.string().required(),
      value: Joi.number().required().min(1),
      create_at: Joi.date().required(),
      deadline: Joi.date().required(),
      status: Joi.string().required()
    })
  }),
  incidentController.create
);
//rota para deletar um incident
routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}),incidentController.delete);

//rota para listagem de todos os casos cadastrados pelas ongs
routes.get('/search', searchController.index);

//rota para historico dos incidents
routes.get('/incidents/history', incidentsHistoryController.index);

//rota para criar historico dos incidents
routes.post('/incidents/history', incidentsHistoryController.create);

//rota para o preenchimento da lista de casos da dashboard
routes.get('/dashboard/incidents', dashboardController.index);

//rota para o preenchimento do gráfico da dashboard
routes.get('/dashboard/status', dashboardController.getStatus);

//rota para atualizar o status quando o deadline foi expirado
routes.post('/incidents/expired', incidentController.handleDeadline);


module.exports = routes;