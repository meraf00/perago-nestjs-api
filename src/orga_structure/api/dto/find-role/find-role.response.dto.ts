import { ApiProperty } from '@nestjs/swagger';
import { FindRoleResult } from '../../../application/query/find-role/FindRoleResult';
import { BaseResponse } from '../BaseResponse';
import { RoleDto } from '../RoleDto';

export class FindRoleResponseDto implements BaseResponse<FindRoleResult> {
  @ApiProperty({ example: 200, type: Number })
  statusCode: number;

  @ApiProperty({ type: RoleDto, required: false })
  data: FindRoleResult;

  @ApiProperty({ example: ['Role not found'], type: [String], required: false })
  errors?: string[];

  constructor(result: FindRoleResult) {
    this.statusCode = 200;
    this.data = result;
  }
}
