import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './infrastructure/entity/Role';
import { RoleController } from './api/controllers/role.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { FindRoleByIdHandler } from './application/query/handlers/FindRoleByIdHandler';
import { FindRolesHandler } from './application/query/handlers/FindRolesHandler';
import { GetHierarchyHandler } from './application/query/handlers/GetHierarchyHandler';
import { InjectionTokens } from './application/InjectionTokens';
import { RolesRepositoryImpl } from './infrastructure/repository/RoleRepositoryImpl';
import { RoleFactory } from './domain/RoleFactory';
import { RolesDomainService } from './domain/RolesDomainService';
import { DeleteRoleHandler } from './application/command/handlers/DeleteRoleHandler';
import { UpdateRoleHandler } from './application/command/handlers/UpdateRoleHandler';
import { CreateRoleHandler } from './application/command/handlers/CreateRoleHandler';

const infrastructure: Provider[] = [
  {
    provide: InjectionTokens.ROLE_REPOSITORY,
    useClass: RolesRepositoryImpl,
  },
];

const application = [
  // query
  FindRoleByIdHandler,
  FindRolesHandler,
  GetHierarchyHandler,

  // command
  CreateRoleHandler,
  UpdateRoleHandler,
  DeleteRoleHandler,
];

const domain = [RoleFactory, RolesDomainService];

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity]), CqrsModule],
  controllers: [RoleController],
  providers: [...domain, ...application, ...infrastructure],
  exports: [TypeOrmModule],
})
export class OrgaStructureModule {}
