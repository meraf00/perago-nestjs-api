import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseResponse<T> {
  @ApiProperty({ example: 200, type: Number })
  statusCode: number;

  @ApiProperty({ required: false })
  data?: T;

  @ApiProperty({ example: 'Not found', type: String, required: false })
  error?: string;

  @ApiProperty({ example: 'Role not found', type: String, required: false })
  message: string;

  constructor(statusCode: number, data?: T, error?: string, message?: string) {
    this.statusCode = statusCode;
    this.data = data;
    this.error = error;
    this.message = message;
  }
}
