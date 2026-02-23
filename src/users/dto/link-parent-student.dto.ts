import { ApiProperty } from '@nestjs/swagger';

export class LinkParentStudentDto {
  @ApiProperty({
    example: 'parent-uuid-here',
    description: 'The ID of the parent user',
  })
  parentId: string;

  @ApiProperty({
    example: 'student@example.com',
    description: 'The email of the student user',
  })
  studentEmail: string;
}
