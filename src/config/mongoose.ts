import * as bluebird from "bluebird";
import * as dotenv from "dotenv";

dotenv.config();

const mongooseConfig = {
  useMongoClient: true
};

export default mongooseConfig;
