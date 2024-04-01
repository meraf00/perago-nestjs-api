import { Test } from '@nestjs/testing';
import { RolesController } from './role.controller';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { QueryBus } from '@nestjs/cqrs';

const moduleMocker = new ModuleMocker(global);

describe('RolesController', () => {
  let rolesController: RolesController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [RolesController],
    })
      .useMocker((token) => {
        const results = ['test1', 'test2'];
        if (token === QueryBus) {
          return { execute: jest.fn().mockResolvedValue(results) };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    rolesController = moduleRef.get<RolesController>(RolesController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      //   expect(await rolesController.getRoles(null, null, null, null)).toBe([]);
    });
  });
});
