import { ZodIssue } from 'zod';

export class ValidationError extends Error {
  constructor(message: string, private issues?: ZodIssue[]) {
    super(message);
    this.name = 'ValidationError';
  }
}
