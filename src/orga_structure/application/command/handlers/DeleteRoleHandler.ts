import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteRoleCommand } from "../DeleteRoleCommand";
import { RolesRepository } from "src/orga_structure/domain/RoleRepository";



@CommandHandler(DeleteRoleCommand)
export class DeleteRoleHandler implements ICommandHandler<DeleteRoleCommand, void> {
    constructor(private readonly rolesRepository: RolesRepository) { }

    async execute(command: DeleteRoleCommand): Promise<void> {
        await this.rolesRepository.delete(command.id)
    }
}