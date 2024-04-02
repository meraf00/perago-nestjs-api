import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from '../BaseResponse';
import { GetHierarchyResult } from '../../../application/query/get-hierarchy/GetHierarchyResult';
import { HierarchyDto } from '../HierarchyDto';

export class GetHierarchyResponseDto extends BaseResponse<GetHierarchyResult> {
  @ApiProperty({ type: HierarchyDto, required: false })
  data: GetHierarchyResult;

  constructor(result: GetHierarchyResult) {
    super(200, result);
  }
}
