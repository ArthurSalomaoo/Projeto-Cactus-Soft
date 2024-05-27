const { PrismaClient } = require("@prisma/client");
const { cli } = require("winston/lib/winston/config");

const prisma = new PrismaClient();

module.exports = {
  async execute() {
    try {
      const clientes = await prisma.clientes.findMany({
        select: {
          nomeCliente: true,
          planoContrato: true
        }
      });
      /*
      const valorCount = clientes.reduce((acc, cliente) => {
        const valor = parseFloat(cliente.valorPlano); // Ensure valorPlano is a number
        if (acc[valor]) {
          acc[valor]++;
        } else {
          acc[valor] = 1;
        }
        return acc;
      }, {});

      const sortedValorCount = Object.entries(valorCount)
        .sort((a, b) => b[0] - a[0]) // Sort by the numeric value in descending order
        .reduce((acc, [key, value]) => {
          acc[parseFloat(key)] = value; // Ensure keys are numbers
          return acc;
        }, {});*/

      return clientes;
    } catch (error) {
      error.path = "src/models/findManyClientes.js";
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  },
};


/*
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  async execute() {
    try {
      let clientes = await prisma.clientes.findMany();
      clientes = JSON.stringify(clientes, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      );
      return clientes;
    } catch (error) {
      error.path = "src/models/findManyClientes.js";
      throw error;
      // ... tratamento de erros ...
    } finally {
      await prisma.$disconnect(); // desconecta o Prisma Client do banco de dados
    }
  },
};
*/