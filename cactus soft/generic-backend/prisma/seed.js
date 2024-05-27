const csv = require("csvtojson");
const fs = require("fs");
const path = require("path");
const { faker } = require("@faker-js/faker");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function convertStringToDate(dateString) {
  if (!dateString) return null;
  return new Date(dateString);
}
ac
async function main() {
  const csvFilePath = path.join(__dirname, "../src/data/clientes.csv");
  const jsonArray = await csv().fromFile(csvFilePath);
  jsonArray.map((cliente, index) => {
    jsonArray[index].conexaoInicial = convertStringToDate(
      cliente.conexaoInicial
    );
    jsonArray[index].conexaoFinal = convertStringToDate(cliente.conexaoFinal);
    jsonArray[index].statusCliente = Boolean(cliente.statusCliente);
    jsonArray[index].nomeCliente = faker.person.fullName().toUpperCase();
    jsonArray[index].tempoConectado = parseInt(cliente.tempoConectado);
    jsonArray[index].consumoDownload = parseInt(cliente.consumoDownload);
    jsonArray[index].consumoUpload = parseInt(cliente.consumoUpload);
    jsonArray[index].statusInternet = parseInt(cliente.statusInternet);
    jsonArray[index].valorPlano = parseFloat(cliente.valorPlano);
  });
  await prisma.clientes.createMany({ data: jsonArray });
}

main()
  .then(async () => {
    console.log("Seed concluído com sucesso");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
