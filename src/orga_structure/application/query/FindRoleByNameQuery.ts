import { IQuery } from "@nestjs/cqrs";

export class FindRoleByNameQuery implements IQuery {
    constructor(public readonly name: string) { }
}