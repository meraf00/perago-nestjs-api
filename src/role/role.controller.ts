import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleDto } from './dto/role.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    try {
      const role = await this.roleService.create(createRoleDto);
      return new RoleDto(role);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get()
  async findAll() {
    const roles = await this.roleService.findAll();
    return roles.map((role) => new RoleDto(role));
  }

  @Get('tree')
  findTree() {
    return this.roleService.findTree();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const role = await this.roleService.findOne(id);

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return new RoleDto(role);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    try {
      await this.roleService.update(id, updateRoleDto);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return await this.roleService.remove(id);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
