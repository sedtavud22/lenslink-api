/*
  Warnings:

  - Added the required column `main_image` to the `works` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `works` ADD COLUMN `main_image` VARCHAR(191) NOT NULL;
