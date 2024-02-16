// eslint-disable-next-line import/no-extraneous-dependencies
import "@openzeppelin/hardhat-upgrades";
import { ethers, upgrades } from "hardhat";

async function main(): Promise<void> {
  const factory = await ethers.getContractFactory("Reserve");

  const contract: Awaited<ReturnType<(typeof factory)["deploy"]>> = (await upgrades.deployProxy(factory, [], {
    kind: "transparent",
  })) as any;

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
