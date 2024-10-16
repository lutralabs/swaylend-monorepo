import { selectMarket, useMarketStore } from '@/stores';

import { useMarketContract } from '@/contracts/useMarketContract';
import { useQuery } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import { useCollateralConfigurations } from './useCollateralConfigurations';

export const useTotalCollateral = (marketParam?: string) => {
  const storeMarket = useMarketStore(selectMarket);
  const market = marketParam ?? storeMarket;
  const { data: collateralConfigurations } =
    useCollateralConfigurations(market);
  const marketContract = useMarketContract(market);

  return useQuery({
    queryKey: [
      'totalCollateral',
      collateralConfigurations,
      marketContract?.account?.address,
      marketContract?.id,
    ],
    queryFn: async () => {
      if (!collateralConfigurations || !marketContract) {
        return null;
      }

      const totalsCollateral = await marketContract.functions
        .get_all_totals_collateral()
        .get();

      const totals = new Map<string, BigNumber>(
        totalsCollateral.value.map(([assetId, value]) => [
          assetId.bits,
          new BigNumber(value.toString()),
        ])
      );

      return totals;
    },
    enabled: !!collateralConfigurations && !!marketContract,
  });
};
