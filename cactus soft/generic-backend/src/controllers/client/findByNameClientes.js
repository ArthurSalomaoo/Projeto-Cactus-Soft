const logger = require("../../custom/logger");
const findClienteByName = require("../../models/findClienteByName");

module.exports = {
  async handle(req, res) {
    try {
      const name = req.query.name;
      const clientes = await findClienteByName.execute(name);
      const clientesFormatted = clientes.map(cliente => {
        return Object.fromEntries(
          Object.entries(cliente).map(([key, value]) => [
            key,
            typeof value === 'bigint' ? value.toString() : value
          ])
        );
      });

      logger.info("successfully found clients");
      res.status(200).json(clientesFormatted);
    } catch (error) {
      if (!error.path) {
        //informa o caminho do erro se não tiver
        error.path = "src/controllers/client/findByNameClientes.js";
      }
      throw error;
    }
  },
};  