import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateRoleCommand } from "../UpdateRoleCommand";
import { RolesRepository } from "src/orga_structure/domain//RoleRepository";

@CommandHandler(UpdateRoleCommand)
export class UpdateRoleHandler implements ICommandHandler<UpdateRoleCommand, void> {
    constructor(private readonly rolesRepository: RolesRepository) { }

    async execute(command: UpdateRoleCommand): Promise<void> {
        const role = await this.rolesRepository.findById(command.id);

        role.updateName(command.name);
        role.updateDescription(command.description);

        await this.rolesRepository.save(role);
    }
}