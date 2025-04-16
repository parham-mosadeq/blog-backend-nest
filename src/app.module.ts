import { Module } from '@nestjs/common';
import { BlogModule } from './blogs';

@Module({
  imports: [BlogModule],
})
export class AppModule {}
