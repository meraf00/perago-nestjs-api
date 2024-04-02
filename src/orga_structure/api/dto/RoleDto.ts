import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
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
    description: 'The role that this role reports to.',
    type: () => RoleDto,
    nullable: true,
  })
  readonly reportsTo: string;

  @ApiProperty({
    description: 'List of the roles that report to this role.',
    type: () => [RoleDto],
  })
  readonly subordinates: RoleDto[];

  @ApiProperty({
    type: Date,
  })
  readonly createdAt: Date;

  @ApiProperty({
    type: Date,
  })
  readonly updatedAt: Date;
}
