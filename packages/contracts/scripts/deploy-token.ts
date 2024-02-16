import { ethers } from "hardhat";

async function main(): Promise<void> {
  const factory = await ethers.getContractFactory("TestCoin");

  const contract = await factory.deploy();

  console.log("🚀[Contract]", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.log("🚀 ~ file: deploy-mainnet.ts:38 ~ error:", error);
    process.exit(1);
  });
