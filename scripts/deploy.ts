// @ts-nocheck
import { ethers } from "hardhat";

async function main() {
  const USDC = "0x0000000000000000000000000000000000000000";  // replace with actual testnet USDC address on 0G chain
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);

  const Registry = await ethers.deployContract("FairTrainRegistry", [USDC]);
  await Registry.waitForDeployment();
  console.log("Registry deployed at:", await Registry.getAddress());

  const keeperHubExecutor = process.env.KEEPERHUB_EXECUTOR || "0x1111111111111111111111111111111111111111";

  const Stream = await ethers.deployContract("RoyaltyStream", [
    USDC,
    await Registry.getAddress(),
    keeperHubExecutor,
  ]);
  await Stream.waitForDeployment();
  console.log("RoyaltyStream deployed at:", await Stream.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
