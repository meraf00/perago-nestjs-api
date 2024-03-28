export interface HierarchyNode {
    readonly id: string;
    readonly name: string;
    readonly description: string
    readonly children: HierarchyNode[]
}