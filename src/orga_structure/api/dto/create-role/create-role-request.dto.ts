import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const createRoleSchema = z
  .object({
    name: z.string().min(1),
    description: z.string().min(1),
    reportsTo: z.string().uuid().nullable(),
  })
  .required();

export type CreateRoleType = z.infer<typeof createRoleSchema>;

export class CreateRoleDto implements CreateRoleType {
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
