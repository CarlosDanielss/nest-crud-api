import {
  Controller,
  Get,
  HttpCode,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import { JoiValidationPipe } from 'src/config/joi-validation-pipe.config';

import * as j from 'joi';
import { ReadUsersService } from 'src/services/read-users.service';
import { AuthGuard } from '@nestjs/passport';

const readUsersSchema = j.object({
  page: j.number().min(1).required(),
});

type ReadUsersRequest = { page: string };

@Controller('/user')
@UseGuards(AuthGuard('jwt'))
export class ReadUsersController {
  constructor(private readUsersService: ReadUsersService) {}

  @Get()
  @HttpCode(200)
  @UsePipes(new JoiValidationPipe(readUsersSchema))
  async handle(@Query() query: ReadUsersRequest) {
    const page = Number(query.page);

    const result = await this.readUsersService.execute({ page });

    return result;
  }
}
