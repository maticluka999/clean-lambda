import { ZodIssue } from "zod";

export class QueryParamsError extends Error {
  constructor(message: string, private issues?: ZodIssue[]) {
    super(message);
    this.name = "QueryParamsError";
  }
}
