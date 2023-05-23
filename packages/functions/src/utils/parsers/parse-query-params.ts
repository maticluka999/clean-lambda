import { Schema, ZodError } from 'zod';
import { APIGatewayProxyEventV2 } from 'aws-lambda';
import { QueryParamsError } from '../errors/query-params-error';

export function parseQueryParams(
  event: APIGatewayProxyEventV2,
  schema: Schema
) {
  if (!event.queryStringParameters) {
    return {};
  }

  try {
    const parsed = schema.parse(event.queryStringParameters);
    return parsed;
  } catch (e) {
    if (e instanceof ZodError) {
      throw new QueryParamsError('Invalid query params', e.issues);
    }
  }
}
