//
import { Schema } from "mongoose";
import * as mongoose from "mongoose";
import employeeInterface from "./interface";

const employeeSchema: Schema = new Schema({
  employeeId: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  designation: { type: String, required: true },
  email: { type: String, required: true },
  phonenumber: { type: Number, required: true },
  experiance: { type: Number, required: true },
});

export default mongoose.model<employeeInterface>("employees", employeeSchema);
