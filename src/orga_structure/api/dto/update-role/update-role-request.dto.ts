import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const updateRoleSchema = z
  .object({
    name: z.string().min(1),
    description: z.string().min(1),
    reportsTo: z.string().uuid(),
  })
  .required();

export type UpdateRoleType = z.infer<typeof updateRoleSchema>;

export class UpdateRoleDto implements UpdateRoleType {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({
    example: '8383e6bb-1624-44d6-b3d6-0ed8687875c1',
    type: String,
    format: 'uuid',
    nullable: true,
  })
  reportsTo: string | null;
}
