import { IQueryResult } from "@nestjs/cqrs";

export class FindRolesResult implements IQueryResult {
    constructor(public readonly role: Readonly<{
        id: string;
        name: string;
        description: string
        reportsTo: string
    }>[]) { }
}