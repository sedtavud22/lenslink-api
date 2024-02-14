/*
  Warnings:

  - You are about to drop the column `image_name` on the `work_images` table. All the data in the column will be lost.
  - Added the required column `public_key` to the `work_images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `main_image_key` to the `works` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `work_images` DROP COLUMN `image_name`,
    ADD COLUMN `public_key` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `works` ADD COLUMN `main_image_key` VARCHAR(191) NOT NULL;
