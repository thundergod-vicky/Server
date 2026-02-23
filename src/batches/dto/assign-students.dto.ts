import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignStudentsDto {
  @ApiProperty({ example: ['studentId1', 'studentId2'], isArray: true })
  @IsArray()
  @IsString({ each: true })
  studentIds: string[];
}
