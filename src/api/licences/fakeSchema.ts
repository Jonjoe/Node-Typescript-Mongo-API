/**
 * Schema Faker
 * [model name] Model
 */

// Imports =============================
import * as Faker from "faker";
import IFace from "./interface";

// Exports =============================
export default (): IFace => {
  return {
    property1: Faker.name.firstName(),
    property2: Faker.name.firstName()
  };
};
