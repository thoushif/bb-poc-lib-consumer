import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

import { ApiClient } from "third-party-provider";

export async function CreateCustomer(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const name = request.query.get("name") || (await request.text()) || "world";
  const client = new ApiClient("test-host", false);
  const resp = await client.createCustomer(name);

  const responseBody = JSON.stringify(resp);

  return {
    body: responseBody,
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
  };
}

app.http("CreateCustomer", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: CreateCustomer,
});
