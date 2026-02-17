import { IsString, IsNumber, IsArray } from 'class-validator';

export class CreatePracticeTestDto {
  title: string;
  totalQuestions: number;
  questions: any[];
  timeLimit?: number; // In minutes
}
