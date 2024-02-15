/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `work_requests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `work_requests` DROP COLUMN `deleted_at`;
