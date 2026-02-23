import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name' })
  name: string;

  @ApiProperty({ example: 'john@example.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  password: string;

  @ApiProperty({
    example: 'STUDENT',
    enum: ['STUDENT', 'TEACHER', 'PARENT', 'ADMIN'],
    description: 'User role',
  })
  role: string;
}
