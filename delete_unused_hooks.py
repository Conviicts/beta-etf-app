import os

to_delete = [
    'useAccountLastTransactions.ts',
    'useAssetsInfo.ts',
    'useBatchQuery.ts',
    'useBlockInfoBatch.ts',
    'useBridgeTransactionInfo.ts',
    'useCreateProposal.ts',
    'useCreateToken.ts',
    'useDelegate.ts',
    'useDelegationInfo.ts',
    'useHomeData.ts',
    'usePortfolioInfo.ts',
    'useProposalDelegations.ts',
    'useProposalInfo.ts',
    'useRequestCache.ts',
    'useRewards.ts',
    'useTVLData.ts',
    'useTokenEnrichmentBatch.ts',
    'useTokenInfo.ts',
    'useTokenRegistry.ts',
    'useTransactionInfo.ts',
    'useUserVote.ts',
    'useValidatorDetail.ts',
    'useValidatorInfo.ts',
    'useValidators.ts',
    'useValidatorsWithEnrichedData.ts',
    'useVote.ts',
    'useWrapper.tsx'
]

for file in to_delete:
    path = os.path.join('hooks', file)
    if os.path.exists(path):
        os.remove(path)
        print(f'Deleted: {file}')
    else:
        print(f'Not found: {file}')
