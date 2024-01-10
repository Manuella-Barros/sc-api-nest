/*
  Warnings:

  - You are about to drop the column `categoriaId` on the `produtos` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `produtos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "produtos" DROP CONSTRAINT "produtos_categoriaId_fkey";

-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "categoriaId",
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
