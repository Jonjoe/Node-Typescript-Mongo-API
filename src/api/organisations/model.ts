/**
 * Mongoose Schema 
 * [model name] Model
 */

// imports =============================
import { Schema, model } from "mongoose";

// Schema ==============================
const schema: Schema = new Schema({
  createdAt: Date,
  updatedAt: Date,

  property1: {
    type: String,
    default: "",
    required: true
  },

  property2: {
    type: String,
    default: "",
    required: true
  }
});

// Exports ==============================
export default model("[model name]", schema);
