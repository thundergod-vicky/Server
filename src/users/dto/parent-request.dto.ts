import { ApiProperty } from '@nestjs/swagger';

export class ParentRequestDto {
  @ApiProperty({
    example: 'student@example.com',
    description: 'Email of the student to link with',
  })
  studentEmail: string;
}
