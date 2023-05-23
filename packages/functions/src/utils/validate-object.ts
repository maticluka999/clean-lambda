import { Schema, ZodError, z } from 'zod';
import { ValidationError } from './errors/validation-error';

export function validateObject(obj: any, schema: Schema) {
  try {
    return schema.parse(obj);
  } catch (e) {
    if (e instanceof ZodError) {
      throw new ValidationError('Validation error', e.issues);
    }
  }
}
