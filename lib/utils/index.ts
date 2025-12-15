import { TRUNCATE_END, TRUNCATE_START } from "@/config/constants"

export const getBaseUrl = () => {
  return typeof window !== "undefined" ? window.location.origin : ""
}

export const baseUrl = getBaseUrl()

export const truncateAddress = (
  address: string,
  start = TRUNCATE_START,
  end = TRUNCATE_END
) => `${address.slice(0, start)}…${address.slice(-end)}`

export const truncateNumber = (
  number: string,
  maxLength: number = 12,
  start: number = 6,
  end: number = 4
): string => {
  if (number.length <= maxLength) {
    return number
  }
  return `${number.slice(0, start)}..${number.slice(-end)}`
}
