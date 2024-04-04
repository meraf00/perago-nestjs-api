import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../entities/role.entity';

export class RoleDto {
  @ApiProperty({
    type: String,
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ nullable: true, type: String, format: 'uuid', example: null })
  parentId: string | null;

  @ApiProperty({ required: false, type: [RoleDto] })
  subordinates?: RoleDto[];

  constructor(role: Role) {
    this.id = role.id;
    this.name = role.name;
    this.description = role.description;
    this.parentId = role.parent?.id;
    this.subordinates = role.subordinates?.map((role) => new RoleDto(role));
  }
}
