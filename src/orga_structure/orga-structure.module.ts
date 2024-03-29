import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './infrastructure/entity/Role';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class OrgaStructureModule {}
