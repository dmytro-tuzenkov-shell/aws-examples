import "reflect-metadata";
import debug from "debug";
import { Container, decorate, injectable, interfaces } from "inversify";
import * as AWSS3 from "@aws-sdk/client-s3";

import { TYPES } from "./types";
import { AmazonStorage } from "../providers/amazon-storage";
import { Application } from "../app";

const _debug = debug("app:ioc-container");

_debug("init IoC container with types %O", TYPES);
export const container = new Container();

container
  .bind<AmazonStorage>(TYPES.AmazonStorageService)
  .to(AmazonStorage)
  .inSingletonScope();

container
  .bind<Application>(TYPES.Application)
  .to(Application)
  .inSingletonScope();

// lazy loading of aws s3 client
decorate(injectable(), AWSS3.S3Client);

container
  .bind<interfaces.Factory<AWSS3.S3Client>>(TYPES.FactoryAmazonStorageClient)
  .toFactory<AWSS3.S3Client>(() => {
    _debug("init -> %s", TYPES.FactoryAmazonStorageClient);
    return () => {
      _debug("call -> %s", TYPES.FactoryAmazonStorageClient);
      if (!container.isBound(TYPES.AmazonStorageClient)) {
        _debug("create -> %s", TYPES.FactoryAmazonStorageClient);
        const client = new AWSS3.S3Client({ region: process.env.AWS_REGION });

        container
          .bind<AWSS3.S3Client>(TYPES.AmazonStorageClient)
          .toConstantValue(client);
      }
      _debug("return -> %s", TYPES.FactoryAmazonStorageClient);
      return container.get<AWSS3.S3Client>(TYPES.AmazonStorageClient);
    };
  });
