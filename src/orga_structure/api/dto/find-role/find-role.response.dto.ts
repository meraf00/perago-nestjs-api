import { ApiProperty } from '@nestjs/swagger';
import { FindRoleResult } from '../../../application/query/find-role/FindRoleResult';
import { BaseResponse } from '../BaseResponse';
import { RoleDto } from '../RoleDto';

export class FindRoleResponseDto extends BaseResponse<FindRoleResult> {
  @ApiProperty({ type: RoleDto, required: false })
  data: FindRoleResult;

  constructor(result: FindRoleResult) {
    super(200, result);
  }
}
