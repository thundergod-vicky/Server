import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'John Doe', description: 'User full name' })
  name?: string;

  @ApiPropertyOptional({
    example: 'john@example.com',
    description: 'User email',
  })
  email?: string;

  @ApiPropertyOptional({
    example: 'newpassword123',
    description: 'New password',
  })
  password?: string;

  @ApiPropertyOptional({
    example: 'https://avatar.url',
    description: 'Avatar URL',
  })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiPropertyOptional({ example: '+1234567890', description: 'User phone number' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: 'STUD-0001/26', description: 'Unique Enrollment ID' })
  @IsOptional()
  @IsString()
  enrollmentId?: string;

  @ApiPropertyOptional({
    example: 'A_PLUS',
    enum: [
      'F',
      'D',
      'D_PLUS',
      'C',
      'C_PLUS',
      'B',
      'B_PLUS',
      'A',
      'A_PLUS',
      'E',
    ],
    description: 'Student grade',
  })
  grade?: any;
}
