import { Schema, Document } from "mongoose";
import * as connections from "../../config/connection/connection";

export interface IUserModelV3 extends Document {
  userAddress: String;
  healthFactor: Number;
  usdAmountAtRisk: Number;
  usdAmountEligibleForLiquidation: Number;
  totalBaseValueProvided:Number;
  version: String;
}

const UserSchemaV3: Schema = new Schema({
  userAddress: {
    type: String,
  },
  healthFactor: Number,
  usdAmountAtRisk: Number,
  usdAmountEligibleForLiquidation: Number,
  totalBaseValueProvided:Number,
  version: String,
});

export default connections.db.model<IUserModelV3>("UserModelV3", UserSchemaV3);
