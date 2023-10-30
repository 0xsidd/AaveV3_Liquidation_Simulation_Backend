import config from "../../config/env";
import * as V3PoolABI from "../../utils/abi/v3Pool.json";
import { ethers } from "ethers";
import UserModelV3 from "../../components/User/model";
import { getEvents } from "../../utils/event.helper";

const Cron = {
  async fetchV3BorrowEventAndStore() {
    try {
      const v3PoolAddress: any = config.v3PoolAddress;
      const rpc: any = config.mainnet_forked_rpc;
      const wbtc: any = "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599";

      // Initialize an Ethereum provider using ethers.js
      const provider = new ethers.providers.JsonRpcProvider(rpc);

      const v3PoolABI = V3PoolABI;

      // Create a contract instance using ethers.js
      const v3PoolContract = new ethers.Contract(
        v3PoolAddress,
        v3PoolABI,
        provider
      );

      // Fetch events using ethers.js
      let supplyEvents: any = await getEvents(
        "Supply",
        v3PoolAddress,
        v3PoolContract,
        config.startingBlock,
        provider
      );


      // Use a Set to keep track of processed addresses
      const processedAddresses = new Set();
      supplyEvents?.events
        .filter(function (e: any) {          
          return e.args.reserve == wbtc;
        })
        .map(async (e: any) => {
          let userAddressFromEvent = e.args[2].toLowerCase();

          // Check if the address has been processed already
          if (!processedAddresses.has(userAddressFromEvent)) {
            processedAddresses.add(userAddressFromEvent);

            // Check if a user with the given userAddress already exists
            let userDbData = await UserModelV3.findOne({
              userAddress: userAddressFromEvent,
            });

            // If the user doesn't exist, create a new document
            if (!userDbData) {
              await UserModelV3.create({
                userAddress: e.args[1].toLowerCase(),
                version: "V3",
              });
            }
          }
        });
    } catch (err) {
      console.log(err);
    }
  },
  async checkHealthFactor() {
    try {
      const v3PoolAddress: any = config.v3PoolAddress;
      const rpc: any = config.mainnet_forked_rpc;

      // Initialize an Ethereum provider using ethers.js
      const provider = new ethers.providers.JsonRpcProvider(rpc);

      const v3PoolABI = V3PoolABI;

      // Create a contract instance using ethers.js
      const v3PoolContract = new ethers.Contract(
        v3PoolAddress,
        v3PoolABI,
        provider
      );
      let allBorrowedUsers = await UserModelV3.find();
      for (const user of allBorrowedUsers) {
        const userAdd = user.userAddress;
        let userAccountDataV3 = await v3PoolContract.getUserAccountData(
          userAdd
        );
        if (
          userAccountDataV3.healthFactor._hex ===
          "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
        ) {
          await UserModelV3.findOneAndDelete({ userAddress: userAdd });
          console.log(`deleted ${userAdd}`);
        } else {
          console.log(
            `added hf of ${userAdd} value ${
              parseInt(userAccountDataV3.healthFactor._hex, 16) / 1e18
            }`
          );
          let amountAtRisk: any;
          let amountForLiquidation: any;
          let healthFactor: any =
            parseInt(userAccountDataV3.healthFactor._hex, 16) / 1e18;
          let totalCollateralBase: any =
            parseInt(userAccountDataV3.totalCollateralBase._hex, 16) / 1e8;

          if (healthFactor < 1 && healthFactor > 0.95) {
            amountAtRisk = 0;
            amountForLiquidation = totalCollateralBase / 2;
          } else if (healthFactor < 0.95) {
            amountAtRisk = 0;
            amountForLiquidation = totalCollateralBase;
          } else if (healthFactor > 1 && healthFactor < 1.5) {
            amountAtRisk = totalCollateralBase / 2;
            amountForLiquidation = 0;
          } else {
            amountAtRisk = 0;
            amountForLiquidation = 0;
          }
          console.log({
            userAdd,
            healthFactor,
            amountAtRisk,
            amountForLiquidation,
            totalCollateralBase,
          });

          await UserModelV3.findOneAndUpdate(
            {
              userAddress: userAdd,
            },
            {
              $set: {
                healthFactor: healthFactor,
                usdAmountAtRisk: amountAtRisk,
                usdAmountEligibleForLiquidation: amountForLiquidation,
                totalBaseValueProvided: totalCollateralBase,
              },
            }
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
};

export default Cron;
