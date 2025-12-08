import { useMutation } from "@tanstack/react-query"
import { useAccount, useChainId } from "wagmi"
import { useWeb3Provider } from "./useWeb3Provider"
import { ETF_FACTORY_CONTRACT_ADDRESS, etfFactoryAbi } from "@/constant/helios-contracts"
import { getBestGasPrice } from "@/lib/utils/gas"
import { TransactionReceipt } from "viem"
import { getErrorMessage } from "@/utils/string"
import { EventLog } from "web3"

interface CreateETFParams {
  depositToken: string
  depositFeed: string
  router: string
  assetTokens: string[]
  priceFeeds: string[]
  targetWeightsBps: number[]
  depositPaths: string[][]
  withdrawPaths: string[][]
  name: string
  symbol: string
}

interface CreateETFResult {
  vault: string
  shareToken: string
  txHash: string
  blockNumber: number
}

export const useETFContract = () => {
  const { address } = useAccount()
  const web3Provider = useWeb3Provider()

  const createETF = useMutation({
    mutationFn: async (params: CreateETFParams): Promise<CreateETFResult> => {
      if (!web3Provider || !address) {
        throw new Error("No wallet connected")
      }

      try {
        const chainId = await useChainId()
        if (!chainId) {
          throw new Error("No chain id found")
        }
        const factoryContract = new web3Provider.eth.Contract(
          etfFactoryAbi as any,
            ETF_FACTORY_CONTRACT_ADDRESS[`${chainId}`]
          )
        if (!factoryContract) {
          throw new Error("No factory contract found for chain id: " + chainId)
        }

        // Prepare the depositTokenAndDepositFeedAndRouter array
        const depositTokenAndDepositFeedAndRouter = [
          params.depositToken,
          params.depositFeed,
          params.router
        ]

        // Simulate the transaction
        const resultOfSimulation = await factoryContract.methods
          .createETF(
            depositTokenAndDepositFeedAndRouter,
            params.assetTokens,
            params.priceFeeds,
            params.targetWeightsBps,
            params.depositPaths,
            params.withdrawPaths,
            params.name,
            params.symbol
          )
          .call({
            from: address
          })

        if (!resultOfSimulation) {
          throw new Error("Error during simulation, please try again later")
        }

        // Estimate gas
        const gasEstimate = await factoryContract.methods
          .createETF(
            depositTokenAndDepositFeedAndRouter,
            params.assetTokens,
            params.priceFeeds,
            params.targetWeightsBps,
            params.depositPaths,
            params.withdrawPaths,
            params.name,
            params.symbol
          )
          .estimateGas({
            from: address
          })

        // Add 20% to the gas estimation to be safe
        const gasLimit = (BigInt(gasEstimate.toString()) * 120n) / 100n

        // Get best gas price
        const bestGasPrice = await getBestGasPrice(web3Provider)

        // Send the transaction
        const receipt = await new Promise<TransactionReceipt>((resolve, reject) => {
          web3Provider.eth
            .sendTransaction({
              from: address,
              to: ETF_FACTORY_CONTRACT_ADDRESS[`${chainId}`],
              data: factoryContract.methods
                .createETF(
                  depositTokenAndDepositFeedAndRouter,
                  params.assetTokens,
                  params.priceFeeds,
                  params.targetWeightsBps,
                  params.depositPaths,
                  params.withdrawPaths,
                  params.name,
                  params.symbol
                )
                .encodeABI(),
              gas: gasLimit.toString(),
              gasPrice: bestGasPrice.toString()
            })
            .then((tx) => {
              resolve(tx as any)
            })
            .catch((error) => {
              reject(error)
            })
        })

        // Parse the ETFCreated event from the receipt using getPastEvents
        const events = await factoryContract.getPastEvents("ETFCreated", {
          fromBlock: receipt.blockNumber,
          toBlock: receipt.blockNumber,
          filter: { transactionHash: receipt.transactionHash }
        })

        if (events.length === 0) {
          throw new Error("Could not find ETFCreated event in transaction receipt")
        }

        const event = events[0]
        const vaultAddress = (event as EventLog).returnValues.vault as string
        const shareTokenAddress = (event as EventLog).returnValues.shareToken as string

        if (!vaultAddress || !shareTokenAddress) {
          throw new Error("Could not find vault or shareToken in ETFCreated event")
        }

        return {
          vault: vaultAddress,
          shareToken: shareTokenAddress,
          txHash: receipt.transactionHash,
          blockNumber: Number(receipt.blockNumber)
        }
      } catch (error: unknown) {
        throw new Error(getErrorMessage(error) || "Error during createETF")
      }
    }
  })

  return {
    createETF: createETF.mutateAsync,
    isLoading: createETF.isPending,
    error: createETF.error
  }
}

