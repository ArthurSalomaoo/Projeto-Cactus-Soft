const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function execute(name) {
  try {
    const clientes = await prisma.clientes.findMany({
      where: {
        nomeCliente: {
          contains: name,
          mode: "insensitive"
        }
      }
    });
    return clientes;
  } catch (error) {
    error.path = "src/models/findClienteByName.js";
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = {
  execute,
};