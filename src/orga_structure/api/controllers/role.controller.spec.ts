import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from './role.controller';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetHierarchyQuery } from '../../application/query/get-hierarchy/GetHierarchyQuery';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { BaseResponse } from '../dto/BaseResponse';
import { FindRolesResponseDto } from '../dto/find-role/find-roles.response.dto';

const moduleMocker = new ModuleMocker(global);

describe('RolesController', () => {
  let rolesController: RolesController;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [RolesController],
    })
      .useMocker((token) => {
        const mockMetadata = moduleMocker.getMetadata(
          token,
        ) as MockFunctionMetadata<any, any>;
        const Mock = moduleMocker.generateFromMetadata(mockMetadata);
        return new Mock();
      })
      .compile();

    rolesController = moduleRef.get<RolesController>(RolesController);
  });

  it('should be defined', () => {
    expect(rolesController).toBeDefined();
  });

  describe('find', () => {
    it('should call query bus with `FindRolesQuery` when hierarcy is false', async () => {
      const request = {
        name: 'CEO',
        description: 'Chief Executive Officer',
        reportsTo: null,
        hierarchy: false,
      };

      const queryArg = {
        name: 'CEO',
        description: 'Chief Executive Officer',
        reportsTo: null,
      };

      const queryExecuteSpy = jest.spyOn(
        moduleRef.get<QueryBus>(QueryBus),
        'execute',
      );

      await rolesController.find(
        request.name,
        request.description,
        request.reportsTo,
        request.hierarchy,
      );

      expect(queryExecuteSpy).toHaveBeenCalledWith(
        expect.objectContaining(queryArg),
      );
    });

    it('should call query bus with `GetHierarchyQuery` when hierarcy is requested', async () => {
      const request = {
        name: 'CEO',
        description: 'Chief Executive Officer',
        reportsTo: null,
        hierarchy: true,
      };

      const queryExecuteSpy = jest.spyOn(
        moduleRef.get<QueryBus>(QueryBus),
        'execute',
      );

      await rolesController.find(
        request.name,
        request.description,
        request.reportsTo,
        request.hierarchy,
      );

      expect(queryExecuteSpy).toHaveBeenCalledWith(
        expect.any(GetHierarchyQuery),
      );
    });

    it('should return the result of the query execution', async () => {
      const request = {
        name: 'CEO',
        description: 'Chief Executive Officer',
        reportsTo: null,
        hierarchy: false,
      };

      const queryResult = 'Query result';

      jest
        .spyOn(moduleRef.get<QueryBus>(QueryBus), 'execute')
        .mockResolvedValue(queryResult);

      const result = await rolesController.find(
        request.name,
        request.description,
        request.reportsTo,
        request.hierarchy,
      );

      expect(result).toBeInstanceOf(FindRolesResponseDto);
      expect(result.data).toBe(queryResult);
    });
  });

  describe('create', () => {
    it('should call command bus with `CreateRoleCommand`', async () => {
      const request = {
        name: 'CEO',
        description: 'Chief Executive Officer',
        reportsTo: null,
      };

      const commandArg = {
        name: 'CEO',
        description: 'Chief Executive Officer',
        reportsTo: null,
      };

      const commandExecuteSpy = jest.spyOn(
        moduleRef.get<CommandBus>(CommandBus),
        'execute',
      );

      await rolesController.create(request);

      expect(commandExecuteSpy).toHaveBeenCalledWith(
        expect.objectContaining(commandArg),
      );
    });

    it('should return the result of the command execution', async () => {
      const request = {
        name: 'CEO',
        description: 'Chief Executive Officer',
        reportsTo: null,
      };

      const commandResult = 'Command result';

      jest
        .spyOn(moduleRef.get<CommandBus>(CommandBus), 'execute')
        .mockResolvedValue(commandResult);

      const result = await rolesController.create(request);

      expect(result).toBe(commandResult);
    });

    it('should throw an error if the command fails', async () => {
      const request = {
        name: 'CEO',
        description: 'Chief Executive Officer',
        reportsTo: null,
      };

      const commandError = new ConflictException('Root role already exists.');

      jest
        .spyOn(moduleRef.get<CommandBus>(CommandBus), 'execute')
        .mockRejectedValue(commandError);

      await expect(rolesController.create(request)).rejects.toThrow(
        commandError,
      );
    });
  });

  describe('update', () => {
    it('should call command bus with `UpdateRoleCommand`', async () => {
      const roleId = '8383e6bb-1624-44d6-b3d6-0ed8687875c1';
      const updateDto = {
        name: 'CEO',
        description: 'Chief Executive Officer',
        reportsTo: null,
      };

      const commandArg = {
        id: '8383e6bb-1624-44d6-b3d6-0ed8687875c1',
        name: 'CEO',
        description: 'Chief Executive Officer',
        reportsTo: null,
      };

      const commandExecuteSpy = jest.spyOn(
        moduleRef.get<CommandBus>(CommandBus),
        'execute',
      );

      await rolesController.update(roleId, updateDto);

      expect(commandExecuteSpy).toHaveBeenCalledWith(
        expect.objectContaining(commandArg),
      );
    });

    it('should return the result of the command execution', async () => {
      const roleId = '8383e6bb-1624-44d6-b3d6-0ed8687875c1';

      const updateDto = {
        name: 'CEO',
        description: 'Chief Executive Officer',
        reportsTo: null,
      };

      const commandResult = 'Command result';

      jest
        .spyOn(moduleRef.get<CommandBus>(CommandBus), 'execute')
        .mockResolvedValue(commandResult);

      const result = await rolesController.update(roleId, updateDto);

      expect(result).toBe(commandResult);
    });

    it('should throw an error if the command fails', async () => {
      const roleId = '8383e6bb-1624-44d6-b3d6-0ed8687875c1';
      const updateDto = {
        name: 'CEO',
        description: 'Chief Executive Officer',
        reportsTo: null,
      };

      const commandError = new ConflictException('Root role already exists.');

      jest
        .spyOn(moduleRef.get<CommandBus>(CommandBus), 'execute')
        .mockRejectedValue(commandError);

      await expect(rolesController.update(roleId, updateDto)).rejects.toThrow(
        commandError,
      );
    });
  });

  describe('delete', () => {
    it('should call command bus with `DeleteRoleCommand`', async () => {
      const roleId = '8383e6bb-1624-44d6-b3d6-0ed8687875c1';

      const commandArg = { id: '8383e6bb-1624-44d6-b3d6-0ed8687875c1' };

      const commandExecuteSpy = jest.spyOn(
        moduleRef.get<CommandBus>(CommandBus),
        'execute',
      );

      await rolesController.delete(roleId);

      expect(commandExecuteSpy).toHaveBeenCalledWith(
        expect.objectContaining(commandArg),
      );
    });

    it('should throw an error if the command fails', async () => {
      const roleId = '8383e6bb-1624-44d6-b3d6-0ed8687875c1';

      const commandError = new NotFoundException('Role not found.');

      jest
        .spyOn(moduleRef.get<CommandBus>(CommandBus), 'execute')
        .mockRejectedValue(commandError);

      await expect(rolesController.delete(roleId)).rejects.toThrow(
        commandError,
      );
    });
  });

  afterAll(async () => {
    await moduleRef.close();
  });
});
