/*
  Warnings:

  - The primary key for the `categorias` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `categorias` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `categoriaId` on the `produtos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "produtos" DROP CONSTRAINT "produtos_categoriaId_fkey";

-- AlterTable
ALTER TABLE "categorias" DROP CONSTRAINT "categorias_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "categorias_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "categoriaId",
ADD COLUMN     "categoriaId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "categorias_id_key" ON "categorias"("id");

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
