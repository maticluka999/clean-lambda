import { noteSchema } from "@clean-lambda/core/model/note";
import { notes } from "src/data";
import { NotFoundError } from "src/utils/errors/not-found-error";
import lambdaHandler from "src/utils/global-handlers/lambda-handler";
import { parsePathParams } from "src/utils/parse-path-params";

const pathParamsSchema = noteSchema.pick({ id: true });

export const handler = lambdaHandler(async (event) => {
  const { id } = parsePathParams(event, pathParamsSchema);

  const index = notes.findIndex((n) => n.id === id);

  if (index === -1) {
    throw new NotFoundError(`Note with id ${id} doesn't exist.`);
  }

  notes.splice(index, 1);

  return {
    statusCode: 204,
  };
});
