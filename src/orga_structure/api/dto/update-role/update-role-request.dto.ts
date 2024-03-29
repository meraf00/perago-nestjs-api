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
  name: string;
  description: string;
  reportsTo: string;
}
