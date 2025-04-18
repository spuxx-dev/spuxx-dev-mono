import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MappingModule } from '@spuxx/nest-utils';
import { AuthModule } from '@spuxx/nest-auth';
import { EnvModule } from './env/env.module';
import { authConfig } from './auth/auth.config';
import { ToledoModule } from './toledo/toledo.module';
import { OrmModule } from './orm/orm.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MappingModule,
    EnvModule,
    AuthModule.forRoot(authConfig),
    OrmModule,
    UsersModule,
    ToledoModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
