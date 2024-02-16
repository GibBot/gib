/* eslint-disable import/no-extraneous-dependencies */
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import { HardhatUserConfig } from "hardhat/config";
import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";

dotenvConfig({ path: resolve(__dirname, "./.env") });

const chainIds = {
  ganache: 1337,
  goerli: 5,
  hardhat: 31337,
  kovan: 42,
  mainnet: 1,
  rinkeby: 4,
  ropsten: 3,
};

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
const privKey = process.env.PRIVATE_KEY!;

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: chainIds.hardhat,
    } as any,
    goerli: {
      chainId: chainIds.goerli,
      url: "https://rpc.ankr.com/eth_goerli",
      accounts: [privKey],
    },
    bnb_testnet: {
      chainId: 97,
      url: "https://bsc-testnet.publicnode.com",
      accounts: [privKey],
    },
    bsc: {
      chainId: 56,
      url: "https://rpc.ankr.com/bsc",
      accounts: [privKey],
    },
    mainnet: {
      chainId: 1,
      url: "https://rpc.ankr.com/eth",
      accounts: [privKey],
    },
    polygon_testnet: {
      url: "https://matic-mumbai.chainstacklabs.com/",
      accounts: [privKey],
      // gasPrice: 8000000000, // You can adjust this to set the gas price for your transactions
      chainId: 80001,
    },
    polygon_mainnet: {
      url: "https://polygon-rpc.com/",
      accounts: [privKey],
      // gasPrice: 8000000000, // You can adjust this to set the gas price for your transactions
      chainId: 137,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.17",
      },
    ],
  },
  gasReporter: {
    currency: "USD",
    gasPrice: 100,
    enabled: process.env.REPORT_GAS === "true" ?? false,
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
  etherscan: {
    apiKey: process.env.API_KEY,
  },
};

export default config;
