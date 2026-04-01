import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BiometricLogDto {
  @IsString()
  @IsNotEmpty()
  employee_code: string;

  @IsString()
  @IsNotEmpty()
  log_datetime: string;

  @IsString()
  @IsNotEmpty()
  log_time: string;

  @IsString()
  @IsOptional()
  downloaded_at?: string;

  @IsString()
  @IsNotEmpty()
  device_sn: string;
}
