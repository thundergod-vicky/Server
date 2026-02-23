import { IsString, IsOptional, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBatchDto {
  @ApiProperty({ example: 'Class 10 - Mathematics' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Morning batch for class 10 math students', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'userId_of_teacher' })
  @IsString()
  teacherId: string;
}
