import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserRepository } from 'src/repositories/user.repository';

interface UpdateUserInput {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}

type UpdateUserOutput = { message: string };

@Injectable()
export class UpdateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({ id, ...data }: UpdateUserInput): Promise<UpdateUserOutput> {
    const userAlreadyExists = await this.userRepository.findById(id);

    if (!userAlreadyExists) {
      throw new NotFoundException('O usuário não foi encontrado.');
    }

    if (data.email) {
      const isAlreadyUserWithThisEmail = await this.userRepository.findByEmail(
        data.email,
      );

      if (isAlreadyUserWithThisEmail) {
        throw new ConflictException(
          'Esse e-mail já está associado a outra conta.',
        );
      }
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 8);
    }

    await this.userRepository.update({ id, ...data });

    return { message: 'O usuário foi atualizado com sucesso!' };
  }
}
