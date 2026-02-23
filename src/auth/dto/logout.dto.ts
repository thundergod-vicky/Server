import { ApiProperty } from '@nestjs/swagger';

export class LogoutDto {
  @ApiProperty({
    example: 'user-uuid-here',
    description: 'The ID of the user logging out',
  })
  userId: string;
}
