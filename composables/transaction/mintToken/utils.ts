import { usePreferencesStore } from '@/stores/preferences'
import { Max, MintTokenParams, MintedCollection, TokenToMint } from '../types'

export const copiesToMint = <T extends TokenToMint>(token: T): number => {
  const { copies, selectedCollection } = token
  const { alreadyMinted, max } = selectedCollection as MintedCollection & Max
  const maxAllowedNftsInCollection = (max || 0) === 0 ? Infinity : max
  const remaining = maxAllowedNftsInCollection - alreadyMinted

  // Default to 1 if copies is less than 1 or not defined
  return Math.min(copies && copies >= 1 ? copies : 1, remaining)
}

export const calculateFees = () => {
  const preferences = usePreferencesStore()
  const enabledFees: boolean =
    preferences.getHasSupport || preferences.getHasCarbonOffset

  const feeMultiplier =
    Number(preferences.getHasSupport) +
    2 * Number(preferences.getHasCarbonOffset)

  return { enabledFees, feeMultiplier }
}

export const transactionFactory = (getArgs) => {
  return async ({
    item,
    api,
    executeTransaction,
    isLoading,
    status,
  }: MintTokenParams) => {
    const { $i18n } = useNuxtApp()

    isLoading.value = true
    status.value = 'loader.ipfs'
    const args = await getArgs(item, api)

    const nameInNotifications = Array.isArray(item.token)
      ? item.token.map((t) => t.name).join(', ')
      : item.token.name

    executeTransaction({
      cb: api.tx.utility.batchAll,
      arg: args,
      successMessage:
        item.successMessage ||
        ((blockNumber) =>
          $i18n.t('mint.mintNFTSuccess', {
            name: nameInNotifications,
            block: blockNumber,
          })),
      errorMessage:
        item.errorMessage ||
        $i18n.t('mint.errorCreateNewNft', { name: nameInNotifications }),
    })
  }
}
