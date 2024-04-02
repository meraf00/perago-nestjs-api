import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from './BaseResponse';

class Hierarchy {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440001',
    type: String,
  })
  readonly id: string;

  @ApiProperty({ example: 'CEO', type: String })
  readonly name: string;

  @ApiProperty({
    example:
      'The chief executive officer (CEO) is the highest-ranking person in a company.',
    type: String,
  })
  readonly description: string;

  @ApiProperty({
    description: 'List of the roles that report to this role.',
    type: () => [Hierarchy],
  })
  readonly subordinates: HierarchyDto[];
}

export class HierarchyDto {
  @ApiProperty({
    type: Hierarchy,
  })
  hierarchy: Hierarchy;
}
