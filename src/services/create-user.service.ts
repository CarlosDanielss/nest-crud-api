import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/user.repository';

type CreateUserInput = Pick<User, 'name' | 'email' | 'password'>;

type CreateUserOutput = Omit<User, 'password'>;

@Injectable()
export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserInput): Promise<CreateUserOutput> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new ConflictException('O usuário já existe!');
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const { password: _, ...rest } = user;

    return rest;
  }
}
