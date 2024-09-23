import { ConfigService } from '@nestjs/config';
import * as j from 'joi';

const envSchema = j
  .object({
    NODE_ENV: j.string().valid('developer', 'production').required(),
    JWT_SECRET: j.string(),
    PORT: j.number().default(3333),
    DB_HOST: j.string(),
    DB_PORT: j.number(),
    DB_USERNAME: j.string(),
    DB_PASSWORD: j.string(),
    DB_NAME: j.string(),
  })
  .unknown();

export const EnvValidation = (configService: ConfigService) => {
  const { error, value } = envSchema.validate(configService);

  if (error) {
    throw new Error(error.details[0].message);
  }

  return value;
};
