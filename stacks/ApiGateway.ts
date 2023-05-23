import { StackContext, Api } from 'sst/constructs';

export function ApiGateway({ stack }: StackContext) {
  const api = new Api(stack, 'api', {
    routes: {
      'GET /notes': 'packages/functions/src/handlers/get-notes.handler',
      'GET /notes/{id}': 'packages/functions/src/handlers/get-note.handler',
      'POST /notes': 'packages/functions/src/handlers/create-note.handler',
      'PUT /notes': 'packages/functions/src/handlers/update-note.handler',
      'DELETE /notes/{id}':
        'packages/functions/src/handlers/delete-note.handler',
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
