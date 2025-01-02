/*
  Warnings:

  - You are about to drop the column `title` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the `_TaskCategories` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `description` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "_TaskCategories" DROP CONSTRAINT "_TaskCategories_A_fkey";

-- DropForeignKey
ALTER TABLE "_TaskCategories" DROP CONSTRAINT "_TaskCategories_B_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "title";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "categoryId" INTEGER,
ALTER COLUMN "description" SET NOT NULL;

-- DropTable
DROP TABLE "_TaskCategories";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
