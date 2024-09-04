import { Market } from '@/contract-types';
import { useMarketStore } from '@/stores';
import { DEPLOYED_MARKETS } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import { useProvider } from './useProvider';
import { useUtilization } from './useUtilization';

export const useBorrowRate = () => {
  const provider = useProvider();
  const { data: utilization } = useUtilization();
  const { market } = useMarketStore();

  return useQuery({
    queryKey: ['borrowRate', utilization?.toString(), market],
    queryFn: async () => {
      if (!provider || !utilization) return null;

      const marketContract = new Market(
        DEPLOYED_MARKETS[market].marketAddress,
        provider
      );

      const { value } = await marketContract.functions
        .get_borrow_rate(utilization)
        .get();

      if (!value) throw new Error('Failed to fetch borrowRate');
      return new BigNumber(value.toString());
    },
    enabled: !!utilization && !!provider,
  });
};