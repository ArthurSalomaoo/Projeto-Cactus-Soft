-- CreateTable
CREATE TABLE "clientes" (
    "id" TEXT NOT NULL,
    "statusCliente" BOOLEAN,
    "ipConcentrador" TEXT,
    "nomeConcentrador" TEXT,
    "latitudeCliente" TEXT,
    "longitudeCliente" TEXT,
    "conexaoInicial" TIMESTAMP(3),
    "conexaoFinal" TIMESTAMP(3),
    "tempoConectado" INTEGER,
    "consumoDownload" BIGINT,
    "consumoUpload" BIGINT,
    "motivoDesconexao" TEXT,
    "popCliente" TEXT,
    "nomeCliente" TEXT,
    "enderecoCliente" TEXT,
    "bairroCliente" TEXT,
    "cidadeCliente" TEXT,
    "planoContrato" TEXT,
    "statusInternet" INTEGER,
    "valorPlano" DOUBLE PRECISION,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);
