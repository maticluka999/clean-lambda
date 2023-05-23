import { Schema, ZodError } from 'zod';
import { PathParamsError } from '../errors/path-params-error';
import { APIGatewayProxyEventV2 } from 'aws-lambda';

export function parsePathParams(event: APIGatewayProxyEventV2, schema: Schema) {
  try {
    return schema.parse(event.pathParameters);
  } catch (e) {
    if (e instanceof ZodError) {
      throw new PathParamsError('Invalid path params', e.issues);
    }
  }
}
