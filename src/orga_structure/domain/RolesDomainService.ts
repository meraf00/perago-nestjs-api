import { HierarchyNode } from "./Hierarchy";
import { Role } from "./Role";

export class RolesDomainService {

    async buildHierarchy(roles: Role[]): Promise<HierarchyNode> {
        const map = new Map<string, HierarchyNode>();

        roles.forEach(role => {
            map.set(role.id, {
                id: role.id,
                name: role.name,
                description: role.description,
                children: []
            });
        });

        let root: HierarchyNode = null;

        roles.forEach(role => {
            const node = map.get(role.id);
            const parent = map.get(role.reportsTo.id);

            if (parent) {
                parent.children.push(node);
            } else {
                root = node;
            }
        });

        return root
    }
}