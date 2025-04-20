import { Module } from '@nestjs/common';
import { BlogModule } from './blogs';
import { TypeOrmModule } from './datasource';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [BlogModule, TypeOrmModule, AuthModule],
})
export class AppModule {}
