/*
  Warnings:

  - You are about to drop the column `main_image` on the `works` table. All the data in the column will be lost.
  - Added the required column `main_image_url` to the `works` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `works` DROP COLUMN `main_image`,
    ADD COLUMN `main_image_url` VARCHAR(191) NOT NULL;
