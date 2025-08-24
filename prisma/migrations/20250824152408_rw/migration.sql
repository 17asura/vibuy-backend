/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hashed_password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "password",
ADD COLUMN     "email_verify" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hashed_password" TEXT NOT NULL,
ADD COLUMN     "terms_verify" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "public"."User"("id");
