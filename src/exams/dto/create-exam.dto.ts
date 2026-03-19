import { IsString, IsOptional, IsEnum, IsUUID } from 'class-validator';

export enum ExamStatus {
  DRAFT = 'DRAFT',
  PLANNED = 'PLANNED',
  SCHEDULED = 'SCHEDULED',
}

export class CreateExamDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  batchId?: string;

  @IsEnum(ExamStatus)
  @IsOptional()
  status?: ExamStatus;
}
