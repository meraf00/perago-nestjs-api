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
import { ZodValidationPipe } from '../../../shared/validator';
import {
  CreateRoleRequestDto,
  createRoleSchema,
} from '../dto/create-role/create-role-request.dto';
import {
  UpdateRoleRequestDto,
  updateRoleSchema,
} from '../dto/update-role/update-role-request.dto';
import { FindRoleByIdQuery } from '../../application/query/find-role/FindRoleByIdQuery';
import { FindRolesQuery } from '../../application/query/find-roles/FindRolesQuery';
import { GetHierarchyQuery } from '../../application/query/get-hierarchy/GetHierarchyQuery';
import { CreateRoleCommand } from '../../application/command/create/CreateRoleCommand';
import { UpdateRoleCommand } from '../../application/command/update/UpdateRoleCommand';
import { DeleteRoleCommand } from '../../application/command/delete/DeleteRoleCommand';
import { GetHierarchyResponseDto } from '../dto/get-hierarchy/get-hierarchy.response.dto';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiBody({
    type: CreateRoleRequestDto,
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
  async create(
    @Body(new ZodValidationPipe(createRoleSchema)) dto: CreateRoleRequestDto,
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
  @ApiResponse({ status: 200, type: GetHierarchyResponseDto })
  @ApiResponse({ status: 200, type: FindRolesResponseDto })
  @Get()
  async find(
    @Query('name') name: string,
    @Query('description') description: string,
    @Query('reportsTo', new ParseUUIDPipe({ version: '4', optional: true }))
    reportsTo: string,
    @Query('hierarchy', new ParseBoolPipe({ optional: true }))
    hierarchy: boolean,
  ): Promise<FindRolesResponseDto | GetHierarchyResponseDto> {
    if (hierarchy) {
      const result = await this.queryBus.execute(new GetHierarchyQuery());
      return new GetHierarchyResponseDto(result);
    } else {
      const query = new FindRolesQuery(name, description, reportsTo);
      const roles = await this.queryBus.execute(query);
      return new FindRolesResponseDto(roles);
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
  async findOne(
    @Param('roleId', new ParseUUIDPipe({ version: '4' })) roleId: string,
  ): Promise<FindRoleResponseDto> {
    const result = await this.queryBus.execute(new FindRoleByIdQuery(roleId));
    return new FindRoleResponseDto(result);
  }

  @ApiBody({
    type: UpdateRoleRequestDto,
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
  async update(
    @Param('roleId', new ParseUUIDPipe({ version: '4' })) roleId: string,
    @Body(new ZodValidationPipe(updateRoleSchema)) dto: UpdateRoleRequestDto,
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
  async delete(
    @Param('roleId', new ParseUUIDPipe({ version: '4' })) roleId: string,
  ) {
    return this.commandBus.execute(new DeleteRoleCommand(roleId));
  }
}
