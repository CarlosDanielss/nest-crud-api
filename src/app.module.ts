import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { EnvValidation } from './config/env.config';
import { DatabaseConfig } from './config/database.config';
import { User } from './entities/user.entity';
import { UserModule } from './modules/user.module';
import { JwtStrategy } from './config/jwt-strategy.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: EnvValidation,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: DatabaseConfig,
    }),
    TypeOrmModule.forFeature([User]),
    PassportModule,
    UserModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
