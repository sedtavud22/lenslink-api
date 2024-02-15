-- AlterTable
ALTER TABLE `work_requests` MODIFY `status` ENUM('Pending', 'Rejected', 'Cancelled', 'Ongoing', 'Completed') NOT NULL DEFAULT 'Pending';
