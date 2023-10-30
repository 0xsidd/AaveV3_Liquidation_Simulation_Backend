import config from "../config/env/index";
import BlockInfoModel from "../components/Block/model";
import { ethers } from "ethers"; // Import ethers

export const getEvents = async (
  eventName: string,
  contractAddress: String,
  contractInstance: any,
  contractStartBlock: any,
  provider: any
) => {
  const blockInfo: any = await BlockInfoModel.find({
    eventName: eventName,
  });
  let startBlock: any;
  let endBlock: any;
  let events: any;
  if (blockInfo.length) {
    startBlock = Number(blockInfo[0].blockNumber) + 1;
  } else {
    await BlockInfoModel.create({
      address: contractAddress,
      eventName: eventName,
      blockNumber: contractStartBlock,
    });
    startBlock = contractStartBlock || 0;
  }

  let currentBlock = config.endBlock;
  // currentBlock = config.endBlock;

  console.log("===========================START", startBlock);
  console.log("=========================CURRENT", currentBlock);
  if (currentBlock >= startBlock) {
    if (
      Number(startBlock) + Number(config.eventBatchSize) >
      Number(currentBlock)
    ) {
      endBlock = currentBlock;
    } else {
      // console.log("jhasfdjaksasgfiafkas",Number(config.eventBatchSize));

      endBlock = Number(startBlock) + Number(config.eventBatchSize);
    }
    console.log("=========================START", startBlock);
    console.log("===========================END", endBlock);
    console.log("------------------------events-----------", eventName);
    events = await contractInstance.queryFilter(
      eventName,
      startBlock,
      endBlock
    );
    // console.log({events});
    

    await BlockInfoModel.updateOne(
      { eventName: eventName },
      { $set: { blockNumber: endBlock } },
      { upsert: true }
    );
    return { events, endBlock };
  } else {
    console.log("Waiting for block number to update");
  }
};
