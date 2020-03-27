const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");
const ongController = require("./controllers/OngController");
const incidentController = require("./controllers/IncidentController");
const profileController = require("./controllers/ProfileController");
const sessionController = require("./controllers/SessionController");

const routes = express.Router();

routes.post("/sessions", sessionController.create);

routes.get("/ongs", ongController.index);
//no express as coisas acontece em sequência - conceito de middleware
routes.post(
  "/ongs",
  celebrate({
    //sempre que a chave de um objeto for uma variável do java script
    // precisa estar entre []
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .required()
        .email(),
      whatsApp: Joi.string()
        .required()
        .min(10)
        .max(11),
      city: Joi.string().required(),
      uf: Joi.string()
        .required()
        .length(2)
    }),
  }),
  ongController.create
);

routes.get("/profile", celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), profileController.index);

routes.get("/incidents", celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  }),
}), incidentController.index);
routes.post("/incidents", celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().min(10),
    value: Joi.number().required().not(0),
  }),
}), incidentController.create);
routes.delete("/incidents/:id", celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
}), incidentController.delete);

module.exports = routes;
