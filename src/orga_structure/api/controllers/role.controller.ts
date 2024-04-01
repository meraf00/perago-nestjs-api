import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { FindRoleByIdQuery } from 'src/orga_structure/application/query/FindRoleByIdQuery';
import { FindRolesQuery } from 'src/orga_structure/application/query/FindRolesQuery';
import { FindRoleResponseDTO } from '../dto/find-role/find-role.response.dto';
import { FindRolesResponseDTO } from '../dto/find-role/find-roles.response.dto';
import { CreateRoleCommand } from 'src/orga_structure/application/command/CreateRoleCommand';
import { ZodValidationPipe } from 'src/shared/validator';
import {
  CreateRoleDto,
  createRoleSchema,
} from '../dto/create-role/create-role-request.dto';
import { GetHierarchyQuery } from 'src/orga_structure/application/query/GetHierarchyQuery';
import { DeleteRoleCommand } from 'src/orga_structure/application/command/DeleteRoleCommand';
import {
  UpdateRoleDto,
  updateRoleSchema,
} from '../dto/update-role/update-role-request.dto';
import { UpdateRoleCommand } from 'src/orga_structure/application/command/UpdateRoleCommand';

@Controller('roles')
export class RoleController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiBody({
    type: CreateRoleDto,
    required: true,
    examples: {
      'Create Role': {
        value: {
          name: 'CEO',
          description: 'Chief Executive Officer',
          reportsTo: null,
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Role created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: "Role parent doesn't exist" })
  @Post()
  async createRole(
    @Body(new ZodValidationPipe(createRoleSchema)) dto: CreateRoleDto,
  ) {
    const command = new CreateRoleCommand(
      dto.name,
      dto.description,
      dto.reportsTo,
    );
    return this.commandBus.execute(command);
  }

  @ApiQuery({
    name: 'name',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'description',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'reportsTo',
    schema: {
      type: 'string',
      format: 'uuid',
    },
    required: false,
  })
  @ApiQuery({
    name: 'hierarchy',
    schema: {
      type: 'boolean',
    },
    required: false,
  })
  @ApiResponse({ status: 200, type: FindRolesResponseDTO })
  @Get()
  async getRoles(
    @Query('name') name,
    @Query('description') description,
    @Query('reportsTo') reportsTo,
    @Query('hierarchy') hierachy,
  ): Promise<FindRolesResponseDTO> {
    if (hierachy) {
      return this.queryBus.execute(new GetHierarchyQuery());
    } else {
      const query = new FindRolesQuery(name, description, reportsTo);
      return this.queryBus.execute(query);
    }
  }

  @ApiParam({
    name: 'roleId',
    schema: {
      type: 'string',
      format: 'uuid',
    },
  })
  @Get(':roleId')
  async getRole(
    @Param('roleId', new ParseUUIDPipe({ version: '4' })) roleId: string,
  ): Promise<FindRoleResponseDTO> {
    const result = this.queryBus.execute(new FindRoleByIdQuery(roleId));
    return result;
  }

  @ApiBody({
    type: UpdateRoleDto,
    required: true,
    examples: {
      'Update Role': {
        value: {
          name: 'CEO',
          description: 'Chief Executive Officer',
          reportsTo: null,
        },
      },
    },
  })
  @ApiParam({
    name: 'roleId',
    schema: {
      type: 'string',
      format: 'uuid',
    },
  })
  @Put(':roleId')
  async updateRole(
    @Param('roleId', new ParseUUIDPipe({ version: '4' })) roleId: string,
    @Body(new ZodValidationPipe(updateRoleSchema)) dto: UpdateRoleDto,
  ) {
    const command = new UpdateRoleCommand(
      roleId,
      dto.name,
      dto.description,
      dto.reportsTo,
    );
    return this.commandBus.execute(command);
  }

  @ApiParam({
    name: 'roleId',
    schema: {
      type: 'string',
      format: 'uuid',
    },
  })
  @Delete(':roleId')
  async deleteRole(
    @Param('roleId', new ParseUUIDPipe({ version: '4' })) roleId: string,
  ) {
    this.commandBus.execute(new DeleteRoleCommand(roleId));
  }
}
