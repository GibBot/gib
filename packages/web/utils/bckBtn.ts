import { useBackButton } from '@tma.js/sdk-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useDisplayBckBtn = () => {
  const bckBtn = useBackButton();
  const router = useRouter();

  useEffect(() => {
    bckBtn.show();
    bckBtn.on('click', () => {
      router.back();
      bckBtn.hide();
    });
  }, []);

  return;
};
