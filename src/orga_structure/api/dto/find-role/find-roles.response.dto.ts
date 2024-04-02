import { ApiProperty } from '@nestjs/swagger';
import { RoleDto } from '../RoleDto';
import { BaseResponse } from '../BaseResponse';
import { FindRolesResult } from 'src/orga_structure/application/query/find-roles/FindRolesResult';

export class FindRolesResponseDto extends BaseResponse<FindRolesResult> {
  @ApiProperty({ type: [RoleDto], required: false })
  data: FindRolesResult;

  constructor(result: FindRolesResult) {
    super(200, result);
  }
}
