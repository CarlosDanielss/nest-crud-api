import {
  Body,
  Controller,
  HttpCode,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JoiValidationPipe } from 'src/config/joi-validation-pipe.config';

import * as j from 'joi';
import { UpdateUserService } from 'src/services/update-user.service';
import { AuthGuard } from '@nestjs/passport';

const updateUserSchema = j
  .object({
    id: j.string().uuid().required(),
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
      }),
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
  })
  .custom((value, helpers) => {
    const atLeastOneProvided = Object.entries(value).some(
      (field) => field !== undefined,
    );

    if (!atLeastOneProvided) {
      return helpers.error('any.required', {
        message: 'At least one of name, email or password must be provided.',
      });
    }

    return value;
  });

interface UpdateUserRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}

@Controller('/user')
@UseGuards(AuthGuard('jwt'))
export class UpdateUserController {
  constructor(private updateUserService: UpdateUserService) {}

  @Put()
  @HttpCode(200)
  @UsePipes(new JoiValidationPipe(updateUserSchema))
  async handle(@Body() body: UpdateUserRequest) {
    const { id, name, email, password } = body;

    const result = await this.updateUserService.execute({
      id,
      name,
      email,
      password,
    });

    return result;
  }
}
