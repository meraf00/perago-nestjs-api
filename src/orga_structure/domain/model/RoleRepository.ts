import { Role } from "./Role";

export interface RoleRepository {
    generateId: () => Promise<string>;
    save: (role: Role | Role[]) => Promise<void>;
    findById: (id: string) => Promise<Role | null>;
    findByName: (name: string) => Promise<Role[]>;
}