import { HELIOS_NETWORK_ID, ETHEREUM_NETWORK_ID, ARBITRUM_NETWORK_ID } from "@/config/app"

export const ETF_FACTORY_CONTRACT_ADDRESS = {
  [HELIOS_NETWORK_ID]: "0x0000000000000000000000000000000000000000",
  [ETHEREUM_NETWORK_ID]: "0x0000000000000000000000000000000000000000",
  [ARBITRUM_NETWORK_ID]: "0x0000000000000000000000000000000000000000",
}

export const etfFactoryAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "vault",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "shareToken",
        type: "address"
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string"
      },
      {
        indexed: false,
        internalType: "string",
        name: "symbol",
        type: "string"
      }
    ],
    name: "ETFCreated",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "depositTokenAndDepositFeedAndRouter",
        type: "address[]"
      },
      {
        internalType: "address[]",
        name: "assetTokens",
        type: "address[]"
      },
      {
        internalType: "address[]",
        name: "priceFeeds",
        type: "address[]"
      },
      {
        internalType: "uint16[]",
        name: "targetWeightsBps",
        type: "uint16[]"
      },
      {
        internalType: "address[][]",
        name: "depositPaths",
        type: "address[][]"
      },
      {
        internalType: "address[][]",
        name: "withdrawPaths",
        type: "address[][]"
      },
      {
        internalType: "string",
        name: "name",
        type: "string"
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string"
      }
    ],
    name: "createETF",
    outputs: [
      {
        internalType: "address",
        name: "vault",
        type: "address"
      },
      {
        internalType: "address",
        name: "shareTokenAddr",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
]
