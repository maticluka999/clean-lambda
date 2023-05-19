import { APIGatewayProxyEventV2 } from "aws-lambda";
import { BodyMissingError } from "../errors/body-missing-error";
import { BodyNotJsonError } from "../errors/body-not-json-error";

export function parseJSONBody(event: APIGatewayProxyEventV2) {
  if (!event.body) {
    throw new BodyMissingError();
  }

  try {
    return JSON.parse(event.body);
  } catch (e: any) {
    if (e.name === "SyntaxError" && e.message.startsWith("Unexpected token")) {
      throw new BodyNotJsonError();
    }
  }
}
