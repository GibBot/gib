// eslint-disable-next-line import/no-extraneous-dependencies
import "@openzeppelin/hardhat-upgrades";
import { ethers, upgrades } from "hardhat";

async function main(): Promise<void> {
  const memeFactory = await ethers.getContractFactory("BuyMeme");

  const contractAddress = process.env.CONTRACT_ADDRESS as string;
  const proxy = await upgrades.upgradeProxy(contractAddress, memeFactory);

  console.log("🚀[Update]", contractAddress, proxy.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.log("🚀 ~ file: deploy-mainnet.ts:38 ~ error:", error);
    process.exit(1);
  });
