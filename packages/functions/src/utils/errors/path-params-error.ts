import { ZodIssue } from 'zod';

export class PathParamsError extends Error {
  constructor(message: string, private issues?: ZodIssue[]) {
    super(message);
    this.name = 'PathParamsError';
  }
}
