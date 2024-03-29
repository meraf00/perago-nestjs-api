import { ApiProperty } from '@nestjs/swagger';

import { FindRoleResult } from 'src/orga_structure/application/query/result/FindRoleResult';

class Role {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001' })
  readonly id: string;

  @ApiProperty({ example: 'CEO' })
  readonly name: string;

  @ApiProperty({
    example:
      'The chief executive officer (CEO) is the highest-ranking person in a company.',
  })
  readonly description: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The ID of the role that this role reports to.',
  })
  readonly reportsTo: string;

  @ApiProperty({
    example: ['550e8400-e29b-41d4-a716-446655440002'],
    description: 'The IDs of the roles that report to this role.',
  })
  readonly subordinates: string[];
}

export class FindRolesResponseDTO extends FindRoleResult {
  @ApiProperty({ type: [Role] })
  readonly roles: Role[];
}
