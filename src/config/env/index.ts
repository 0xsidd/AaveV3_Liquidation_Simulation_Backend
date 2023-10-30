import * as dotenv from "dotenv";
dotenv.config();

interface IConfig {
  port: string | Number;
  database: {
    MONGODB_URI: String;
    MONGODB_DB_MAIN: String;
  };
  v3PoolAddress: String;
  mainnet_forked_rpc: String;
  eventBatchSize: Number;
  startingBlock: Number;
  endBlock: Number;
}

const NODE_ENV: string = process.env.NODE_ENV || "development";

const development: IConfig = {
  port: process.env.PORT || 3000,
  database: {
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/",
    MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || "users_db",
  },
  v3PoolAddress: process.env.AAVE_V3_POOL_ADDRESS,
  mainnet_forked_rpc: process.env.MAINNET_FORKED_RPC.toString(),
  eventBatchSize: Number(process.env.EVENT_BLOCK_BATCH),
  startingBlock: Number(process.env.CONTRACT_STARTING_BOCK),
  endBlock: Number(process.env.EVENT_END_BLOCK),
};

const config: {
  [name: string]: IConfig;
} = {
  development,
};

export default config[NODE_ENV];
