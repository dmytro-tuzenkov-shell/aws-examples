import { inject, injectable } from "inversify";
import * as AWSS3 from "@aws-sdk/client-s3";
import { TYPES } from "../ioc";

@injectable()
export class AmazonStorage {
  constructor(
    @inject(TYPES.FactoryAmazonStorageClient)
    private readonly _awss3Client: () => AWSS3.S3Client
  ) {}

  /**
   * getObject
   * @param bucket
   * @param key
   */
  public async getObject(bucket: string, key: string): Promise<null> {
    const _awss3Client = this._awss3Client();
    console.log("_awss3Client", _awss3Client, bucket, key);
    
    return null
  }
}
