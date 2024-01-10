/*
  Warnings:

  - Added the required column `categoriaId` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produtos" ADD COLUMN     "categoriaId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "categorias" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categorias_id_key" ON "categorias"("id");

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
