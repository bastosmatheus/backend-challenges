-- CreateTable
CREATE TABLE "eventos" (
    "id" SERIAL NOT NULL,
    "nomeEvento" TEXT NOT NULL,
    "dataEvento" TIMESTAMP(3) NOT NULL,
    "horarioEvento" INTEGER NOT NULL,
    "dataInicioInscricoes" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataTerminoInscricoes" TIMESTAMP(3) NOT NULL,
    "limiteParticipantes" INTEGER NOT NULL,
    "informacoesAdicionais" TEXT,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "eventos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inscricoes_evento" (
    "id" SERIAL NOT NULL,
    "dataInscricao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" INTEGER NOT NULL,
    "eventoId" INTEGER NOT NULL,

    CONSTRAINT "inscricoes_evento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nomeUsuario" TEXT NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_nomeUsuario_key" ON "usuarios"("nomeUsuario");

-- AddForeignKey
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscricoes_evento" ADD CONSTRAINT "inscricoes_evento_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscricoes_evento" ADD CONSTRAINT "inscricoes_evento_eventoId_fkey" FOREIGN KEY ("eventoId") REFERENCES "eventos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
