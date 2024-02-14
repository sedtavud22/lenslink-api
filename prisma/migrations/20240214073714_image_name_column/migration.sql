/*
  Warnings:

  - Added the required column `image_name` to the `work_images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `work_images` ADD COLUMN `image_name` VARCHAR(191) NOT NULL;
