import { IQuery } from "@nestjs/cqrs";

export class GetHierarchyQuery implements IQuery {
    constructor(public readonly id: string) { }
}