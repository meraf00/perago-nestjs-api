import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseResponse<T> {
  @ApiProperty({ example: 200, type: Number })
  statusCode: number;

  @ApiProperty({ required: false })
  data?: T;

  @ApiProperty({ example: ['Role not found'], type: [String], required: false })
  errors?: string[];

  constructor(statusCode: number, data?: T, errors?: string[]) {
    this.statusCode = statusCode;
    this.data = data;
    this.errors = errors;
  }
}
