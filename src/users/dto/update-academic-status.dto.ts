import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAcademicStatusDto {
  @ApiPropertyOptional({
    example: 'GOLD',
    enum: [
      'WOOD',
      'STONE',
      'IRON',
      'SILVER',
      'GOLD',
      'DIAMOND',
      'PLATINUM',
      'VIBRANIUM',
    ],
    description: 'Student medal status',
  })
  medal?: any;

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
