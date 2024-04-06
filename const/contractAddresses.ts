/** Replace the values below with the addresses of your smart contracts. */

// 1. Set up the network your smart contracts are deployed to.
// First, import the chain from the package, then set the NETWORK variable to the chain.
import { Sepolia } from "@thirdweb-dev/chains";
export const NETWORK = Sepolia;

// 2. The address of the marketplace V3 smart contract.

export const MARKETPLACE_ADDRESS = "0x2F1aE405DbA52510E657878D78Dc5Fb9239395D6";

// 3. The address of your NFT collection smart contract.
export const NFT_COLLECTION_ADDRESS =
  "0x8e11eC4f93F0339a804922eabE933257C0e1c761";

export const TESLA_COLLECTION_ADDRESS =  "0xb17a70a037e3EBa5962Cf57b8aE7fc1e1Ea1d6a2";

export const ETHERSCAN_URL = "https://sepolia.etherscan.io/";


export const NFT_COLLECTION_ADDRESSS = [
  {
      name: "Mercedes",
      address: "0x2f7a904E7b3915547D4a83BCF2Ef5011AaFb3400",
  },
  {
      name: "Tesla",
      address: "0xb17a70a037e3EBa5962Cf57b8aE7fc1e1Ea1d6a2",
  }
]