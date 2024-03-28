import { IQueryResult } from "@nestjs/cqrs";
import { HierarchyNode } from "src/orga_structure/domain/Hierarchy";

export class GetHierarchyResult implements IQueryResult {
    constructor(public readonly hierarchy: HierarchyNode) {
        Object.assign(this, hierarchy);
    }
}