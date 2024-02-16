import { createGlobalStore } from 'hox';
import { trpc, trpcNormal } from '../trpc';
import { useUser } from './user';

export const [useBalance, getBalance] = createGlobalStore(() => {
  const { isLogin } = useUser();
  const { data, refetch } = trpc.user.getUserTokens.useQuery(undefined, {
    enabled: isLogin,
    refetchOnMount: true,
  });

  const updateAddress = async (address: string) => {
    await trpcNormal.user.setAddress.mutate({ address });

    refetch();
  };

  return {
    refetch,
    tokens: [
      {
        name: 'Tether USD',
        symbol: 'USDT',
        icon: '/images/ethereum.svg',
        decimals: 18,
        chain: {
          name: 'Blast',
          icon: 'https://www.ethereum.org/images/logos/ETHEREUM-ICON_Black.png',
        },
        balance: '100',
        chainId: 5,
        address: '0x0',
        usdValue: 1,
      },
    ],
    bindAddress: data?.bindAddress || null,
    depositAddress: data?.depositAddr || null,
    totalUSDVal: data?.totalUSDVal || 100,
    updateAddress,
  };
});

export type Token = ReturnType<typeof useBalance>['tokens'][0];
