const express = require("express");

const validations = require("./validations");

const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");
const routes = express.Router();

routes.get("/ongs", OngController.index);
routes.post("/ongs", validations.ong.post, OngController.create);

routes.get("/profile", validations.profile.get, ProfileController.index);

routes.post("/sessions", validations.session.post, SessionController.create);

routes.post(
  "/incidents",
  validations.incidents.post,
  IncidentController.create
);
routes.get("/incidents", validations.incidents.get, IncidentController.index);

routes.delete(
  "/incidents/:id",
  validations.incidents.delete,

  IncidentController.delete
);

module.exports = routes;
