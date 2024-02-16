import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { AmountList, AmountListItem } from '../common/amountList';
import { CurrencyCard } from '../common/currencyCard';
import { ResultCard } from '../common/resultCard';
import { LoadTitle } from '../common/title';

function useUser() {
  return {
    profile: '/game/test-avatar.png',
    username: 'Doe',
  };
}

function useGetCurrencyInfo() {
  return {
    image: '/images/ethereum.svg',
    symbol: 'USDT',
    chain: 'Blast',
    amount: 10,
  };
}

export function MoneyGunResult() {
  const { profile, username } = useUser();
  const [list, setList] = useState<AmountListItem[]>([
    {
      profile: '/images/profile.png',
      username: 'Bin',
      date: new Date(),
      amount: 1,
      currency: 'USDT',
      type: 'add',
    },
  ]);
  const currencyInfo = useGetCurrencyInfo();

  return (
    <div className="h-full p-[8px] w-[100vw]">
      <div className="flex flex-col gap-[8px] items-center">
        <ResultCard className="bg-[#EE4C00]">
          <div className="flex justify-center items-center flex-col">
            <LoadTitle className="text-[#EE4C00] absolute top-[10px]">
              Money Gun
            </LoadTitle>
            <div className="flex flex-col items-center gap-[3px] h-[290px] justify-center">
              <div className="font-RealTextPro-ExtraBold text-white text-[21px] tracking-[0.63px] italic mt-[-20px]">
                Sent By
              </div>
              <Image
                src={profile}
                alt={username}
                width={32}
                height={32}
                className="w-[64px] h-[64px] rounded-full overflow-hidden border-[2px] border-solid border-white"
              />
              <div className="font-RealTextPro-Black text-white text-[24px] leading-[25px] italic">
                {username}
              </div>
            </div>
            <motion.div
              className=" absolute bottom-[10px]"
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', duration: 0.5 }}
              onAnimationComplete={() => {
                setList(v => [
                  ...v,
                  {
                    profile: '/images/profile.png',
                    username: 'Bin',
                    date: new Date(),
                    amount: 10,
                    currency: 'USDT',
                    type: 'add',
                  },
                ]);
              }}
            >
              <CurrencyCard
                image={currencyInfo.image}
                symbol={currencyInfo.symbol}
                chain={currencyInfo.chain}
                rightPart={
                  <div className="flex flex-col items-end text-[#2ED158] ">
                    <div className="font-rubik text-[17px] tracking-[-0.408px] leading-[17px]">{`+ ${currencyInfo.amount}`}</div>
                    <div className="font-rubik text-[13px] leading-[13px]">
                      You Received
                    </div>
                  </div>
                }
                className="bg-black w-[220px]"
              />
            </motion.div>
          </div>
        </ResultCard>

        <AmountList list={list} />
      </div>
    </div>
  );
}
