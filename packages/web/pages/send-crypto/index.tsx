/* eslint-disable @typescript-eslint/no-unused-vars */
import { TokenList } from '@/components/BalanceList';
import { SendModesList } from '@/components/sendCryptoModesList';
import { trpcNormal } from '@bot/model';
import { useMiniApp } from '@tma.js/sdk-react';
import { noop } from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Page() {
  const [status, setStatus] = useState<number>(1);
  const tokenList = [];
  const setTokenList = noop;
  const miniApp = useMiniApp();
  const [myTokens, setMyTokens] = useState<any[]>([]);
  const [selectedToken, setSelectedToken] = useState<
    { tokenId: string; chainId: number } | undefined
  >(undefined);
  const router = useRouter();

  useEffect(() => {
    const impl = async () => {
      const res = await trpcNormal.user.getUserTokens.query();
      setTokenList([]);
      setMyTokens([]);
    };

    impl();
  }, []);

  const sendModes = [
    {
      icon: (
        <Image
          src="images/contacts.svg"
          alt="Contact"
          width={48}
          height={48}
        />
      ),
      title: 'Your Telegram Contact',
      description: 'Free transfers within Telegram',
      onClick: () => {
        toast.info('Token receive url is copied to clipboard');
      },
    },
    {
      icon: (
        <Image
          src="images/wallet.svg"
          alt="Wallet"
          width={48}
          height={48}
        />
      ),
      title: 'External Wallet',
      description: 'Send to a crypto address',
      onClick: () => {
        router.replace('/withdraw');
      },
    },
  ];

  function chooseAsset(tokenId: string, chainId: number) {
    setSelectedToken({ tokenId, chainId });
    setStatus(2);
  }
  return (
    <div className="theme-dark bg-base w-[100vw] min-h-screen ">
      <div className="px-[16px] pt-[12px]">
        {status === 1 && (
          <>
            <div className="font-rubik text-[22px] font-semibold leading-[28px] text-primary text-center mt-[48px]">
              Choose asset to send
            </div>
            <div className="mt-[24px]">
              <TokenList
                onClick={token => {
                  chooseAsset(token.address, token.chainId);
                }}
              />
            </div>
          </>
        )}
        {status === 2 && (
          <>
            <div className="font-rubik text-[22px] font-semibold leading-[28px] text-primary text-center mt-[48px]">
              Choose how to send crypto
            </div>
            <SendModesList itemList={sendModes} className="mt-[24px]" />
          </>
        )}
      </div>
    </div>
  );
}
