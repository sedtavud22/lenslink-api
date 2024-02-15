/*
  Warnings:

  - Made the column `card_image_public_id` on table `works` required. This step will fail if there are existing NULL values in that column.
  - Made the column `card_image_url` on table `works` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `works` MODIFY `card_image_public_id` VARCHAR(191) NOT NULL,
    MODIFY `card_image_url` VARCHAR(191) NOT NULL;
