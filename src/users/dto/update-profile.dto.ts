import { ApiPropertyOptional } from '@nestjs/swagger';

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
  avatar?: string;

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
