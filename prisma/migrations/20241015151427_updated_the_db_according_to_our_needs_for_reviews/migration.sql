-- AlterTable
ALTER TABLE "Space" ADD COLUMN     "company_req" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "email_req" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "job_req" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name_req" BOOLEAN NOT NULL DEFAULT false;
