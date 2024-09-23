import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { JoiValidationPipe } from 'src/config/joi-validation-pipe.config';

import * as j from 'joi';
import { CreateUserService } from 'src/services/create-user.service';

const createUserSchema = j.object({
  name: j
    .string()
    .min(5)
    .regex(/^[^\d]*$/, {
      name: 'The name must not contain any numbers.',
    })
    .messages({
      'string.min': 'The name must be at least 5 characters long.',
      'string.pattern.name': 'The name must not contain any numbers.',
      'any.required': 'Name is required.',
    })
    .required(),
  email: j.string().email(),
  password: j
    .string()
    .min(8)
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/,
      {
        name: 'The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
      },
    )
    .messages({
      'string.min': 'The password must be at least 8 characters long.',
      'string.pattern.name':
        'The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    }),
});

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

@Controller('/user')
export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new JoiValidationPipe(createUserSchema))
  async handle(@Body() body: CreateUserRequest) {
    const { name, email, password } = body;

    await this.createUserService.execute({
      name,
      email,
      password,
    });

    return { message: 'O usuário foi criado com sucesso!' };
  }
}
