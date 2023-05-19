import {
  APIGatewayProxyEventV2,
  APIGatewayProxyHandlerV2,
  APIGatewayProxyStructuredResultV2,
  Context,
} from "aws-lambda";
import { handleError } from "./error-handler";

/**
 * Custom lambda wrapper
 */
export default function lambdaHandler(
  lambda: (
    e: APIGatewayProxyEventV2,
    c: Context
  ) => Promise<APIGatewayProxyStructuredResultV2>
): APIGatewayProxyHandlerV2 {
  return async function (event: APIGatewayProxyEventV2, context: Context) {
    try {
      const { statusCode, headers, body } = await lambda(event, context);
      return {
        statusCode: statusCode || 200,
        headers,
        body,
      };
    } catch (e: any) {
      return handleError(e);
    }
  };
}
