const { Router } = require("express");

const findByIdClientesController = require("./controllers/client/findManyClientes");
const findByNameClientesController = require("./controllers/client/findByNameClientes");

const routes = Router();

// Rota para buscar todos os clientes
routes.get("/findManyCliente", findByIdClientesController.handle);

// Rota para buscar cliente pelo nome
routes.get("/findClienteByName", findByNameClientesController.handle);

module.exports = routes;
