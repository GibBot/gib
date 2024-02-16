import dynamic from 'next/dynamic';

export const LoginProvider = dynamic(() => import('./impl'), {
  ssr: false,
});
