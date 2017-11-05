// TODO: This needs to be simpler

import * as Bluebird from "bluebird";
import * as Faker from "faker";
import * as R from "ramda";
import * as mongoose from "mongoose";

require('dotenv').config()
import mongooseConfig from "../config/mongoose";

import * as resources from "~/api";
import * as users from "../api/users";

const createUser = (): users.iFace => {
  return {
    firstName: Faker.name.firstName(),
    lastName: Faker.name.lastName(),
    emailAddress: Faker.internet.email(),
    password: "password"
  };
};

(<any>mongoose).Promise = Bluebird;
mongoose.connect(process.env.MONGO_URI, mongooseConfig);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  /**
   * Seed Users
   */
  // Create array of random users

  const createUsers = new Promise((resolve, reject) => {
    const userCollection: users.iFace[] = R.times(createUser, 20);

    users.model
      // Purge users.
      .remove({})
      // Seed users collection with generated users.
      .then(() => {
        users.model
          .create(userCollection)
          .then((users: any[]) => {
            resolve(users);
          })
          .catch((error: any) => {
            reject(error);
          });
      })
      .catch((error: any) => {
        reject(error);
      });
  });

  createUsers.then((users: any[]) => {
    console.log(`${users.length} users created`)
    process.exit();
  }).catch(error => {
    console.log(error);
    process.exit();
  });
});
