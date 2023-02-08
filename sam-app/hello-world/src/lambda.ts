import "dotenv/config";
import { Context, APIGatewayProxyResult, APIGatewayEvent } from "aws-lambda";
import { TYPES, container } from "./ioc";
import { bootstrap } from "./bootstrap";

export const lambdaHandler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  console.log(`Context: ${JSON.stringify(context, null, 2)}`);

  const app = bootstrap(container);
  const { statusCode, json } = await app.handle(event, context);

  return {
    statusCode,
    body: JSON.stringify(json),
  };
};
