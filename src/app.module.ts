import { Module } from '@nestjs/common';
import { BlogModule } from './blogs';
import { TypeOrmModule } from './datasource';

@Module({
  imports: [BlogModule, TypeOrmModule],
})
export class AppModule {}
