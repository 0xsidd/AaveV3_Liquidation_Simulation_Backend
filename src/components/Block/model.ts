import { Schema,Document } from "mongoose";
import * as connections from "../../config/connection/connection";



export interface IBlockModel extends Document {
    eventName: String,
    blockNumber: String,
  }

const BlockInfoModel = new Schema(
  {
    eventName: { type: String, require: true },
    blockNumber: { type: String, require: true },
  },
  { timestamps: true, versionKey: false }
);

export default connections.db.model<IBlockModel>("BlockInfoModel", BlockInfoModel);