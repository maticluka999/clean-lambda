import { noteSchema } from "@clean-lambda/core/model/note";
import { notes } from "src/data";
import { NotFoundError } from "src/utils/errors/not-found-error";
import { headers } from "src/utils/headers";
import lambdaHandler from "src/utils/global-handlers/lambda-handler";
import { parsePathParams } from "src/utils/parse-path-params";

const pathParamsSchema = noteSchema.pick({ id: true });

export const handler = lambdaHandler(async (event) => {
  const { id } = parsePathParams(event, pathParamsSchema);

  const note = notes.find((n) => n.id === id);

  if (!note) {
    throw new NotFoundError(`Note with id ${id} doesn't exist.`);
  }

  return {
    headers: { ...headers.CONTENT_TYPE_APPLICATION_JSON },
    body: JSON.stringify(note),
  };
});
