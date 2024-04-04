import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @IsOptional()
  description?: string;
}
