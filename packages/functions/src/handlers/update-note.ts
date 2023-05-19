import { noteSchema } from "@clean-lambda/core/model/note";
import { notes } from "src/data";
import { NotFoundError } from "src/utils/errors/not-found-error";
import { headers } from "src/utils/headers";
import lambdaHandler from "src/utils/global-handlers/lambda-handler";
import { parseJSONBody } from "src/utils/parsers/parse-json-body";
import { validateObject } from "src/utils/validate-object";
import { z } from "zod";

const updateSchema = noteSchema.partial().required({ id: true });
type UpdateSchema = z.infer<typeof updateSchema>;

export const handler = lambdaHandler(async (event) => {
  const body = parseJSONBody(event);
  const updateParams: UpdateSchema = validateObject(body, updateSchema);

  const index = notes.findIndex((n) => n.id === updateParams.id);

  if (index === -1) {
    throw new NotFoundError(`Note with id ${updateParams.id} doesn't exist.`);
  }

  notes[index] = Object.assign(notes[index], updateParams);

  return {
    headers: { ...headers.CONTENT_TYPE_APPLICATION_JSON },
    body: JSON.stringify(notes[index]),
  };
});
