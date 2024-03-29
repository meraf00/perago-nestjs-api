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
  name: string;
  description: string;
  reportsTo: string;
}
