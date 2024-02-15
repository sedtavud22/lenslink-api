-- AlterTable
ALTER TABLE `work_requests` MODIFY `date` DATE NOT NULL;

-- AlterTable
ALTER TABLE `works` MODIFY `first_available_date` DATE NOT NULL,
    MODIFY `last_available_date` DATE NOT NULL;
