import {
  APIGatewayProxyEventV2,
  APIGatewayProxyHandlerV2,
  APIGatewayProxyStructuredResultV2,
  Context,
} from 'aws-lambda';
import { handleError } from './error-handler';
import { ApiHandler } from 'sst/node/api';

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
      const apiHandler = ApiHandler((event, context) => lambda(event, context));
      const { statusCode, headers, body, isBase64Encoded, cookies } =
        await apiHandler(event, context);
      return {
        statusCode: statusCode || 200,
        headers,
        body,
        isBase64Encoded,
        cookies,
      };
    } catch (e: any) {
      return handleError(e);
    }
  };
}
