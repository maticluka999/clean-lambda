import { SSTConfig } from "sst";
import { ApiGateway } from "./stacks/ApiGateway";

export default {
  config(_input) {
    return {
      name: "clean-lambda",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(ApiGateway);
  },
} satisfies SSTConfig;
