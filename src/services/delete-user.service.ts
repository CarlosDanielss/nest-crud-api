import { Injectable } from '@nestjs/common';

import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/user.repository';

type DeleteUserInput = Pick<User, 'id'>;

type DeleteUserOutput = { message: string };

@Injectable()
export class DeleteUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({ id }: DeleteUserInput): Promise<DeleteUserOutput> {
    await this.userRepository.delete(id);

    return { message: 'Usuário deletado com sucesso!' };
  }
}
