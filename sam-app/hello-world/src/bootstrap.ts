import { Container } from "inversify";
import { Application } from "./app";
import { TYPES } from "./ioc";

export const bootstrap = (container: Container): Application => {
  const application = container.get<Application>(TYPES.Application);

//   if (application) {
//     container.bind<Application>(TYPES.Application).toConstantValue()
//     application = container.get<Application>(TYPES.Application);
//   }

  return application;
};
