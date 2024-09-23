import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { JoiValidationPipe } from 'src/config/joi-validation-pipe.config';
import * as j from 'joi';
import { AuthenticateUserService } from 'src/services/authenticate-user.service';
import { JwtService } from '@nestjs/jwt';

const authenticateUserSchema = j.object({
  email: j.string().email(),
  password: j
    .string()
    .min(8)
    .regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/,
    ),
});

interface AuthenticateRequest {
  email: string;
  password: string;
}

@Controller('/session')
export class AuthenticateController {
  constructor(
    private authenticateService: AuthenticateUserService,
    private jwt: JwtService,
  ) {}

  @Post()
  @HttpCode(200)
  @UsePipes(new JoiValidationPipe(authenticateUserSchema))
  async handle(@Body() body: AuthenticateRequest) {
    const { email, password } = body;

    const result = await this.authenticateService.execute({ email, password });

    const accessToken = this.jwt.sign({ sub: result.id }, { expiresIn: '10h' });

    return { token: accessToken, user: result };
  }
}
