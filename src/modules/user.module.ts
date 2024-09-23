import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtConfig } from 'src/config/jwt.config';
import { AuthenticateController } from 'src/controllers/authenticate.controller';
import { CreateUserController } from 'src/controllers/create-user.controller';
import { DeleteUserController } from 'src/controllers/delete-user.controller';
import { ReadUsersController } from 'src/controllers/read-users.controller';
import { UpdateUserController } from 'src/controllers/update-user.controller';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/user.repository';
import { AuthenticateUserService } from 'src/services/authenticate-user.service';
import { CreateUserService } from 'src/services/create-user.service';
import { DeleteUserService } from 'src/services/delete-user.service';
import { ReadUsersService } from 'src/services/read-users.service';
import { UpdateUserService } from 'src/services/update-user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: JwtConfig,
    }),
  ],
  controllers: [
    CreateUserController,
    ReadUsersController,
    DeleteUserController,
    UpdateUserController,
    AuthenticateController,
  ],
  providers: [
    CreateUserService,
    ReadUsersService,
    DeleteUserService,
    UpdateUserService,
    AuthenticateUserService,
    UserRepository,
  ],
})
export class UserModule {}
