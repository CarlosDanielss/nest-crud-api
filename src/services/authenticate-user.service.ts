import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/user.repository';

type AuthenticateUserInput = Pick<User, 'email' | 'password'>;

type AuthenticateUserOutput = Omit<User, 'password'>;

@Injectable()
export class AuthenticateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUserInput): Promise<AuthenticateUserOutput> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (!userAlreadyExists) {
      throw new UnauthorizedException('e-mail ou senha inválidos.');
    }

    const isPasswordMatches = await bcrypt.compare(
      password,
      userAlreadyExists.password,
    );

    if (!isPasswordMatches) {
      throw new UnauthorizedException('e-mail ou senha inválidos.');
    }

    const { password: _, ...rest } = userAlreadyExists;

    return rest;
  }
}
