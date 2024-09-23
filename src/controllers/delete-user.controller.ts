import {
  Controller,
  Delete,
  HttpCode,
  Param,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import { JoiValidationPipe } from 'src/config/joi-validation-pipe.config';
import { DeleteUserService } from 'src/services/delete-user.service';

import * as j from 'joi';
import { AuthGuard } from '@nestjs/passport';

const deleteUserSchema = j.object({
  id: j.string().uuid().required(),
});

type DeleteUserRequest = { id: string };

@Controller('/user')
@UseGuards(AuthGuard('jwt'))
export class DeleteUserController {
  constructor(private deleteUserService: DeleteUserService) {}

  @Delete()
  @HttpCode(200)
  @UsePipes(new JoiValidationPipe(deleteUserSchema))
  async handle(@Param(':id') param: DeleteUserRequest) {
    const { id } = param;

    const result = await this.deleteUserService.execute({
      id,
    });

    return result.message;
  }
}
