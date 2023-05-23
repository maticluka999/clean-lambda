import { BodyMissingError } from '../errors/body-missing-error';
import { BodyNotJsonError } from '../errors/body-not-json-error';
import { ForbiddenError } from '../errors/forbidden-error';
import { NotFoundError } from '../errors/not-found-error';
import { PathParamsError } from '../errors/path-params-error';
import { QueryParamsError } from '../errors/query-params-error';
import { UnauthorizedError } from '../errors/unauthorized-error';
import { ValidationError } from '../errors/validation-error';
import { headers } from '../headers';

export function handleError(e: any) {
  // 400
  if (
    e instanceof PathParamsError ||
    e instanceof QueryParamsError ||
    e instanceof BodyMissingError ||
    e instanceof BodyNotJsonError ||
    e instanceof ValidationError
  ) {
    return {
      statusCode: 400,
      headers: { ...headers.CONTENT_TYPE_APPLICATION_JSON },
      body: JSON.stringify({ error: { ...e, message: e.message } }),
    };
  }

  // 401
  if (e instanceof UnauthorizedError) {
    return {
      statusCode: 401,
    };
  }

  // 403
  if (e instanceof ForbiddenError) {
    return {
      statusCode: 403,
      headers: { ...headers.CONTENT_TYPE_APPLICATION_JSON },
      body: JSON.stringify({ error: { message: e.message } }),
    };
  }

  // 404
  if (e instanceof NotFoundError) {
    return {
      statusCode: 404,
      headers: { ...headers.CONTENT_TYPE_APPLICATION_JSON },
      body: JSON.stringify({ error: { message: e.message } }),
    };
  }

  // 500
  console.error(e);

  return {
    statusCode: 500,
    headers: { ...headers.CONTENT_TYPE_APPLICATION_JSON },
    body: JSON.stringify({ message: 'Internal Server Error' }),
  };
}
