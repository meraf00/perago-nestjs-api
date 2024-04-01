import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FindRoleResponseDto } from '../dto/find-role/find-role.response.dto';
import { FindRolesResponseDto } from '../dto/find-role/find-roles.response.dto';
import { ZodValidationPipe } from 'src/shared/validator';
import {
  CreateRoleDto,
  createRoleSchema,
} from '../dto/create-role/create-role-request.dto';
import {
  UpdateRoleDto,
  updateRoleSchema,
} from '../dto/update-role/update-role-request.dto';
import { FindRoleByIdQuery } from 'src/orga_structure/application/query/find-role/FindRoleByIdQuery';
import { FindRolesQuery } from 'src/orga_structure/application/query/find-roles/FindRolesQuery';
import { GetHierarchyQuery } from 'src/orga_structure/application/query/get-hierarchy/GetHierarchyQuery';
import { CreateRoleCommand } from 'src/orga_structure/application/command/create/CreateRoleCommand';
import { UpdateRoleCommand } from 'src/orga_structure/application/command/update/UpdateRoleCommand';
import { DeleteRoleCommand } from 'src/orga_structure/application/command/delete/DeleteRoleCommand';

@ApiTags('Roles')
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
  @ApiResponse({ status: 200, type: FindRolesResponseDto })
  @Get()
  async getRoles(
    @Query('name') name: string,
    @Query('description') description: string,
    @Query('reportsTo', new ParseUUIDPipe({ version: '4', optional: true }))
    reportsTo: string,
    @Query('hierarchy', new ParseBoolPipe({ optional: true }))
    hierarchy: boolean,
  ): Promise<FindRolesResponseDto> {
    if (hierarchy) {
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
  @ApiResponse({
    status: 200,
    type: FindRoleResponseDto,
    description: 'Success',
  })
  @ApiResponse({ status: 404, description: 'Role not found.' })
  @Get(':roleId')
  async getRole(
    @Param('roleId', new ParseUUIDPipe({ version: '4' })) roleId: string,
  ): Promise<FindRoleResponseDto> {
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
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 404, description: 'Role not found.' })
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
