import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/entities/user.entity';

interface UpdateParams {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}

type CreateParams = Pick<User, 'name' | 'email' | 'password'>;

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async update({ id, ...data }: UpdateParams): Promise<void> {
    await this.userRepository.update(id, data);
  }

  async getUsers(page: number): Promise<User[]> {
    const [users, _] = await this.userRepository.findAndCount({
      skip: (page - 1) * 20,
      take: 20,
    });

    return users;
  }

  async delete(id: string): Promise<void> {
    const user = await this.userRepository.delete(id);

    if (user.affected === 0) {
      throw new NotFoundException('O usuário não foi encontrado.');
    }
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async create({ name, email, password }: CreateParams): Promise<User> {
    const user = this.userRepository.create({
      name,
      email,
      password,
    });

    return await this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
