-- CreateEnum
CREATE TYPE "AdmissionStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "Stream" AS ENUM ('FOUNDATION', 'NEET', 'JEE', 'NONE');

-- CreateEnum
CREATE TYPE "Caste" AS ENUM ('GENERAL', 'SC', 'ST', 'OBC', 'EWS');

-- CreateTable
CREATE TABLE "Admission" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "admissionDate" TIMESTAMP(3),
    "formNumber" TEXT NOT NULL,
    "enrollmentNumber" TEXT,
    "studentName" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "alternateContact" TEXT,
    "studentClass" TEXT NOT NULL,
    "stream" "Stream" NOT NULL DEFAULT 'NONE',
    "course" TEXT NOT NULL,
    "batchCode" TEXT,
    "schoolName" TEXT NOT NULL,
    "board" TEXT NOT NULL,
    "caste" "Caste" NOT NULL DEFAULT 'GENERAL',
    "photoUrl" TEXT,
    "status" "AdmissionStatus" NOT NULL DEFAULT 'PENDING',
    "approvedById" TEXT,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admission_studentId_key" ON "Admission"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Admission_formNumber_key" ON "Admission"("formNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Admission_enrollmentNumber_key" ON "Admission"("enrollmentNumber");

-- AddForeignKey
ALTER TABLE "Admission" ADD CONSTRAINT "Admission_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
