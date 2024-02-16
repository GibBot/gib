import { BigButton } from '@/ui-design/bigButton';
import Image from 'next/image';
import { AmountList, AmountListItem } from '../common/amountList';
import { CurrencyCard } from '../common/currencyCard';
import { ResultCard } from '../common/resultCard';
import { LoadTitle } from '../common/title';
import { useEffect, useState } from 'react';
import { sumBy } from 'lodash';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { motion } from 'framer-motion';

dayjs.extend(duration);

function useUser() {
  return {
    profile: '/images/profile.png',
    username: 'Bin',
  };
}

function useGetCurrencyInfo() {
  return {
    image: '/images/ethereum.svg',
    symbol: 'USDT',
    chain: 'Blast',
    amount: 1,
  };
}

export function LuckyDrawResult() {
  const { profile, username } = useUser();
  const [deadline, setDdl] = useState(() => dayjs().add(1, 'day'));
  const now = useNow();

  const timeGap = dayjs.duration(
    dayjs(deadline).diff(now, 'second'),
    'seconds',
  );
  const countdown = timeGap.format('HH:mm:ss');

  const [list, setList] = useState<AmountListItem[]>([
    {
      profile: '/game/test-avatar.png',
      username: 'Doe',
      date: new Date(),
      amount: 10.01,
      currency: 'USDT',
      type: 'sub',
    },
  ]);

  const currencyInfo = useGetCurrencyInfo();
  const sum = sumBy(list, 'amount');
  const [isClose, setIsClose] = useState(false);
  const [joined, setJoined] = useState(false);

  const join = () => {
    setList(v => [
      ...v,
      {
        profile: '/images/profile.png',
        username: 'Bin',
        date: new Date(),
        amount: 100,
        currency: 'USDT',
        type: 'sub',
      },
    ]);

    setDdl(dayjs().add(5, 'seconds'));
    setTimeout(() => {
      setJoined(true);
    }, 200);
  };

  useEffect(() => {
    if (timeGap.asSeconds() === 0) {
      setIsClose(true);
    }
  }, [countdown]);

  return (
    <div className="h-full p-[8px] w-[100vw] flex flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-[8px] items-center">
        <ResultCard className="bg-[#EE4C00]" isEnd={isClose}>
          <div className="flex flex-col items-center">
            <LoadTitle className="text-[#EE4C00] absolute top-[10px]">
              Lucky Draw
            </LoadTitle>
            {isClose ? (
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', duration: 0.5 }}
              >
                <div className="flex flex-col items-center gap-[3px] justify-center min-h-[270px]">
                  <Image
                    src="/images/winner.svg"
                    alt="winner"
                    width={23}
                    height={18.6}
                    className="mt-[-20px]"
                  />
                  <div className="font-RealTextPro-ExtraBold text-white text-[21px] tracking-[0.63px] italic">
                    WINNER
                  </div>
                  <Image
                    src={profile}
                    alt={username}
                    width={32}
                    height={32}
                    className="w-[54px] h-[54px] rounded-full overflow-hidden border-[2px] border-solid border-white"
                  />
                  <div className="font-RealTextPro-Black text-white text-[24px] leading-[25px] italic mt-[5px]">
                    {username}
                  </div>
                </div>
                <CurrencyCard
                  image={currencyInfo.image}
                  symbol={currencyInfo.symbol}
                  chain={currencyInfo.chain}
                  rightPart={
                    <div className="flex flex-col items-end text-[#2ED158] ">
                      <div className="font-RealTextPro-ExtraBold text-[17px] tracking-[0.51px] leading-[17px]">{`+${sum}`}</div>
                    </div>
                  }
                  className="bg-black w-[220px] absolute bottom-[10px]"
                />
              </motion.div>
            ) : (
              <>
                <div className="flex flex-col items-center gap-[3px] h-[280px] justify-center ">
                  <div className="font-RealTextPro-ExtraBold text-white text-[21px] tracking-[0.63px] italic mt-[-10px]">
                    Current Total
                  </div>
                  <div className="font-RealTextPro-Black text-white text-[40px] leading-[110%] italic">
                    {sum}
                  </div>

                  <CurrencyCard
                    image={currencyInfo.image}
                    symbol={currencyInfo.symbol}
                    chain={currencyInfo.chain}
                    theme="light"
                  />
                </div>
                <div className="flex flex-col items-center absolute bottom-[10px]">
                  <div className="font-rubik text-[13px] text-white ">
                    Time remaining
                  </div>
                  <div
                    className="font-RealTextPro-Black text-[18px] tracking-[0.9px] text-white "
                    suppressHydrationWarning
                  >
                    {countdown}
                  </div>
                </div>
              </>
            )}
          </div>
        </ResultCard>

        <AmountList list={list} />
      </div>
      {!joined && (
        <BigButton
          type="primary"
          onClick={() => {
            join();
          }}
          className="mb-[25px]"
        >
          Join the pool
        </BigButton>
      )}
    </div>
  );
}

const useNow = (interval = 1000) => {
  const [ts, setTs] = useState(Date.now());

  useEffect(() => {
    const i = setInterval(() => {
      setTs(Date.now);
    }, interval);

    return () => clearInterval(i);
  }, []);

  return ts;
};
