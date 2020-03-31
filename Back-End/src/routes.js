const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const ongController = require('./controllers/ongController.js');
const incidentController = require('./controllers/incidentController.js');
const searchController = require('./controllers/searchController.js');
const sessionsController = require('./controllers/sessionController');

const routes = express.Router();

//rota de login da ong
routes.post("/sessions", sessionsController.create
);

//rota para o controller que lista as ongs
routes.get('/ongs', ongController.index);
//rota para o controller que cadastra uma ong
//celebrate para validar parametros
routes.post("/ongs",
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

//rota para o controller que lista as incidents
routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}),incidentController.index);
//rota para o controller que cadastra uma incident
routes.post("/incidents", celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required().min(5),
      description: Joi.string().required(),
      value: Joi.number().required().min(1)
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

//rota para listagem de todos os casos de uma ong especifica
routes.get(
  "/search",
  celebrate({ //validação de parametros Header
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown()
  }),
  searchController.index
);



module.exports = routes;