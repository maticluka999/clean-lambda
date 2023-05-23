import { Note, noteSchema } from '@clean-lambda/core/model/note';
import { randomUUID } from 'crypto';
import { notes } from 'src/data';
import lambdaHandler from 'src/utils/global-handlers/lambda-handler';
import { headers } from 'src/utils/headers';
import { parseJSONBody } from 'src/utils/parsers/parse-json-body';
import { validateObject } from 'src/utils/validate-object';

const createSchema = noteSchema.omit({ id: true });

export const handler = lambdaHandler(async (event) => {
  const body = parseJSONBody(event);
  const note: Note = validateObject(body, createSchema);

  note.id = randomUUID();
  notes.push(note);

  return {
    headers: { ...headers.CONTENT_TYPE_APPLICATION_JSON },
    body: JSON.stringify(note),
  };
});
