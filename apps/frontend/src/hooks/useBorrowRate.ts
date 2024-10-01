import { Market } from '@/contract-types';
import { useMarketStore } from '@/stores';

import { appConfig } from '@/configs';
import { useQuery } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import { useProvider } from './useProvider';
import { useUtilization } from './useUtilization';

export const useBorrowRate = (marketParam?: string) => {
  const provider = useProvider();
  const { data: utilization } = useUtilization(marketParam);
  const { market: storeMarket } = useMarketStore();
  const market = marketParam ?? storeMarket;

  return useQuery({
    queryKey: ['borrowRate', utilization?.toString(), market],
    queryFn: async () => {
      if (!provider || !utilization) return null;

      const marketContract = new Market(
        appConfig.markets[market].marketAddress,
        provider
      );

      const { value } = await marketContract.functions
        .get_borrow_rate(utilization)
        .get();

      if (!value) throw new Error('Failed to fetch borrowRate');
      return new BigNumber(value.toString());
    },
    refetchOnWindowFocus: false,
    enabled: !!utilization && !!provider,
  });
};