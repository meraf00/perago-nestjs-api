import { Role } from "./Role";

type CreateRoleOptions = Readonly<{
    id: string;
    name: string;
    description: string;
    reportsTo: Role | null;
    createdAt?: Date;
    updatedAt?: Date;
}>


export class RoleFactory {
    create(options: CreateRoleOptions): Role {
        return new Role({
            createdAt: new Date(),
            updatedAt: new Date(),
            ...options
        });
    }
}