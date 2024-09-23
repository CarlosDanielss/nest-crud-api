import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';

import { UserRepository } from 'src/repositories/user.repository';

type ReadUsersInput = { page: number };

type ReadUsersOutput = Omit<User, 'password'>;

@Injectable()
export class ReadUsersService {
  constructor(private userRepository: UserRepository) {}

  async execute({ page }: ReadUsersInput): Promise<ReadUsersOutput[]> {
    const users = await this.userRepository.getUsers(page);

    const removePasswordField = users.map((user) => {
      const { password, ...rest } = user;

      return rest;
    });

    return removePasswordField;
  }
}
