import { noteSchema } from "@clean-lambda/core/model/note";
import { notes } from "src/data";
import { headers } from "src/utils/headers";
import lambdaHandler from "src/utils/global-handlers/lambda-handler";
import { parseQueryParams } from "src/utils/global-handlers/parse-query-params";
import { z } from "zod";

const queryParamsSchema = noteSchema.partial();
type QueryParams = z.infer<typeof queryParamsSchema>;

export const handler = lambdaHandler(async (event) => {
  const queryParams: QueryParams = parseQueryParams(event, queryParamsSchema);
  const notes = queryNotes(queryParams);

  return {
    headers: { ...headers.CONTENT_TYPE_APPLICATION_JSON },
    body: JSON.stringify(notes),
  };
});

function queryNotes(queryParams: QueryParams) {
  if (!Object.keys(queryParams).length) {
    return notes;
  }

  return notes.filter((n) => {
    let id = false,
      title = false,
      text = false;

    if (queryParams.id) {
      id = n.id === queryParams.id;
    }

    if (queryParams.title) {
      title = n.title.includes(queryParams.title);
    }

    if (queryParams.text) {
      text = n.text.includes(queryParams.text);
    }

    return id || title || text;
  });
}
