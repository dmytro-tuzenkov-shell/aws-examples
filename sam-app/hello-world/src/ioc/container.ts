import "reflect-metadata";
import { Container, decorate, injectable, interfaces } from "inversify";
import * as AWSS3 from "@aws-sdk/client-s3";

import { TYPES } from "./types";
import { AmazonStorage } from "../providers/amazon-storage";

export const container = new Container();

container
  .bind<AmazonStorage>(TYPES.AmazonStorageService)
  .to(AmazonStorage)
  .inSingletonScope();

  // lazy loading of aws s3 client
decorate(injectable(), AWSS3.S3Client);

container
  .bind<interfaces.Factory<AWSS3.S3Client>>(TYPES.FactoryAmazonStorageClient)
  .toFactory<AWSS3.S3Client>(() => {
    return () => {
      if (!container.isBound(TYPES.AmazonStorageClient)) {
        const client = new AWSS3.S3Client({ region: process.env.AWS_REGION });

        container
          .bind<AWSS3.S3Client>(TYPES.AmazonStorageClient)
          .toConstantValue(client);
      }
      
      return container.get<AWSS3.S3Client>(TYPES.AmazonStorageClient);
    };
  });
