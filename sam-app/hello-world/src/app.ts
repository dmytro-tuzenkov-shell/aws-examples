import debug from "debug";
import { inject, injectable } from "inversify";
import * as AWSS3 from "@aws-sdk/client-s3";
import { TYPES } from "./ioc";
import { APIGatewayEvent, Context } from "aws-lambda";
const _debug = debug("app:application");

@injectable()
export class Application {
  constructor(
    @inject(TYPES.FactoryAmazonStorageClient)
    private readonly _storageClient: () => AWSS3.S3Client
  ) {
    this._storageClient = _storageClient;
    _debug("application constructor %s", _storageClient());
  }

  async handle(event: APIGatewayEvent, context: Context): Promise<{ statusCode: number; json: any }> {
    // const _storageClient = this._storageClient();
    
    return {
      statusCode: 200,
      json: { message: "Application.handle" },
    };
  }
}
