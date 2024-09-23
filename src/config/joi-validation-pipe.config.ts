import { BadRequestException, PipeTransform } from '@nestjs/common';
import j from 'joi';

export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: j.Schema) {}

  transform(values: unknown) {
    const { error, value } = this.schema.validate(values);

    if (error) {
      throw new BadRequestException(error.details[0].message);
    }

    return value;
  }
}
