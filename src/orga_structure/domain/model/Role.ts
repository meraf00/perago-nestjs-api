import { AggregateRoot } from "@nestjs/cqrs";
import { BaseModel } from "./BaseModel";

export interface RoleOperations {
    updateName(name: string): void;
    updateDescription(description: string): void;
}

export type RoleProperties = BaseModel & {
    name: string;
    description: string;
    reportTo: Role | null;
}

export class Role extends AggregateRoot implements RoleOperations {
    private readonly id: string;
    private name: string;
    private description: string;
    private reportTo: Role | null;
    private createdAt: Date;
    private updatedAt: Date;


    constructor(properties: RoleProperties) {
        super();
        Object.assign(this, properties);
    }

    updateDescription(description: string): void {
        this.description = description;
    }

    updateName(name: string): void {
        this.name = name;
    }

}