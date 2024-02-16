import type { AppRouter } from '@bot/backend';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  createTRPCProxyClient,
  createTRPCReact,
  httpLink,
} from '@trpc/react-query';
import { HoxRoot } from 'hox';
import React, { useState } from 'react';
import { getUser } from './store/user';

const URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:3009/trpc';
export const trpc = createTRPCReact<AppRouter>();

export const trpcNormal = createTRPCProxyClient<AppRouter>({
  links: [
    httpLink({
      url: URL,
      headers() {
        return {
          authorization: `Bearer ${getUser()?.token}`,
        };
      },
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: 'omit',
        });
      },
    }),
  ],
});

export const ModelProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpLink({
          url: URL,
          headers() {
            return {
              authorization: `Bearer ${getUser()?.token}`,
            };
          },
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: 'omit',
            });
          },
        }),
      ],
    }),
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <HoxRoot>{children}</HoxRoot>
      </QueryClientProvider>
    </trpc.Provider>
  );
};
