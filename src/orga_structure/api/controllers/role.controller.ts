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
import { ZodValidationPipe } from 'src/core/validator';
import {
  CreateRoleDto,
  createRoleSchema,
} from '../dto/create-role/create-role-request.dto';

@Controller('roles')
export class RoleController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiBody({
    type: CreateRoleDto,
    required: true,
    examples: {
      createRole: {
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
  @ApiResponse({ status: 200, type: FindRolesResponseDTO })
  @Get()
  async getRoles(
    @Query('name') name,
    @Query('description') description,
    @Query('reportsTo') reportsTo,
  ): Promise<FindRolesResponseDTO> {
    const query = new FindRolesQuery(name, description, reportsTo);
    return this.queryBus.execute(query);
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

  @Put(':roleId')
  async updateRole() {}

  @Delete(':roleId')
  async deleteRole() {}
}
