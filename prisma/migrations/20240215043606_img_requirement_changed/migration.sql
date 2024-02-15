/*
  Warnings:

  - You are about to drop the column `public_key` on the `work_images` table. All the data in the column will be lost.
  - You are about to drop the column `main_image_key` on the `works` table. All the data in the column will be lost.
  - You are about to drop the column `main_image_url` on the `works` table. All the data in the column will be lost.
  - Added the required column `public_id` to the `work_images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `work_images` DROP COLUMN `public_key`,
    ADD COLUMN `public_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `works` DROP COLUMN `main_image_key`,
    DROP COLUMN `main_image_url`,
    ADD COLUMN `card_image_public_id` VARCHAR(191) NULL,
    ADD COLUMN `card_image_url` VARCHAR(191) NULL;
