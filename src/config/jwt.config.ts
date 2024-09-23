import { ConfigService } from '@nestjs/config';

export const JwtConfig = (configService: ConfigService) => {
  const secret = configService.get<string>('JWT_SECRET');

  return { secret };
};
