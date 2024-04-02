import { ApiProperty } from '@nestjs/swagger';
import { RoleDto } from '../RoleDto';
import { BaseResponse } from '../BaseResponse';
import { FindRolesResult } from 'src/orga_structure/application/query/find-roles/FindRolesResult';

export class FindRolesResponseDto implements BaseResponse<FindRolesResult> {
  @ApiProperty({ example: 200, type: Number })
  statusCode: number;

  @ApiProperty({ type: [RoleDto], required: false })
  data: FindRolesResult;

  @ApiProperty({ example: ['Role not found'], type: [String], required: false })
  errors?: string[];

  constructor(result: FindRolesResult) {
    this.statusCode = 200;
    this.data = result;
  }
}
