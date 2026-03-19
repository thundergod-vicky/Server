import { IsString, IsOptional, IsEnum, IsDateString, IsInt, IsArray } from 'class-validator';
import { ExamStatus } from './create-exam.dto';

export class UpdateExamDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(ExamStatus)
  @IsOptional()
  status?: ExamStatus;

  @IsDateString()
  @IsOptional()
  startTime?: string;

  @IsDateString()
  @IsOptional()
  endTime?: string;

  @IsInt()
  @IsOptional()
  duration?: number;

  @IsOptional()
  questions?: any;

  @IsInt()
  @IsOptional()
  totalQuestions?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  assignedStudentIds?: string[];
}
