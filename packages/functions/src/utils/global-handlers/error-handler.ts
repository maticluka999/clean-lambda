import { BodyMissingError } from "../errors/body-missing-error";
import { BodyNotJsonError } from "../errors/body-not-json-error";
import { ForbiddenError } from "../errors/forbidden-error";
import { NotFoundError } from "../errors/not-found-error";
import { PathParamsError } from "../errors/path-params-error";
import { QueryParamsError } from "../errors/query-params-error";
import { ValidationError } from "../errors/validation-error";

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
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ error: { ...e, message: e.message } }),
    };
  }

  // 403
  if (e instanceof ForbiddenError) {
    return {
      statusCode: 403,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ error: { message: e.message } }),
    };
  }

  // 404
  if (e instanceof NotFoundError) {
    return {
      statusCode: 404,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ error: { message: e.message } }),
    };
  }

  // 500
  console.error(e);

  return {
    statusCode: 500,
    body: JSON.stringify({ message: "Internal Server Error" }),
  };
}
