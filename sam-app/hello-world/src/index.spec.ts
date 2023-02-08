import { beforeEach, describe, expect, it, test } from "@jest/globals";
import { Container, interfaces } from "inversify";
import * as AWSS3 from "@aws-sdk/client-s3";
import { bootstrap } from "./bootstrap";
import { Application } from "./app";
import { TYPES } from "./ioc";
import { AmazonStorage } from "./providers/amazon-storage";

// Mock a container with test services
const newContainer = () => {
  const container = new Container();

  container
    .bind<AmazonStorage>(TYPES.AmazonStorageService)
    .to(AmazonStorage)
    .inSingletonScope();

  container
    .bind<Application>(TYPES.Application)
    .to(Application)
    .inSingletonScope();

  container
    .bind<interfaces.Factory<AWSS3.S3Client>>(TYPES.FactoryAmazonStorageClient)
    .toFactory<AWSS3.S3Client>(() => {
      return () => new AWSS3.S3Client({ region: "null" });
    });

  return container;
};

describe("lambda application", () => {
  let app: Application;

  beforeEach(() => {
    app = bootstrap(newContainer());
  });

  it("should bootstrap and application", () => {
    expect(app).toBeInstanceOf(Application);
  });
});
