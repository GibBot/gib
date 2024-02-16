import { Menu, MenuDivider, MenuItem } from '@/ui-design/menu';
import { useBalance, useSendPkt } from '@bot/model';
import { useMainButton } from '@tma.js/sdk-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { LoadTitle } from '../common/title';

export function CreateDraw() {
  const mainBtn = useMainButton();
  const { tokens } = useBalance();
  const router = useRouter();

  const {
    selectedToken,
    totalAmount,
    participant,
    setParticipant,
    setTotalAmount,
  } = useSendPkt();

  function clickLocationGame() {
    router.replace('/create-game/command?game=LuckyDraw');
  }

  const buttonDisabled = totalAmount === 0 || tokens.length === 0;

  useEffect(() => {
    if (buttonDisabled) {
      mainBtn.setBackgroundColor('#cccccc');
      mainBtn.setText('Configure your pot');
      mainBtn.disable();
      mainBtn.show();
    } else {
      mainBtn.setBackgroundColor('#EE4C00');
      mainBtn.enable();
      mainBtn.setText('Create New Pool');
      mainBtn.on('click', () => {
        clickLocationGame();
      });
      mainBtn.show();
    }

    return () => {};
  }, [buttonDisabled]);

  const inputList = [
    {
      header: (
        <Image
          src="/images/hand-coin-01.svg"
          alt="coin"
          width={24}
          height={24}
        />
      ),
      content: 'My Share',
      value: (
        <input
          className="font-rubik text-[17px] leading-[20px] tracking-[-0.24px] focus:border-none focus:outline-none text-right placeholder:text-muted placeholder:font-rubik placeholder:text-[17px] placeholder:leading-[20px] placeholder:tracking-[-0.24px] text-primary bg-[#F05E1A] w-20 "
          type="number"
          onChange={e => setTotalAmount(Number(e.currentTarget.value))}
          placeholder="0.00"
        />
      ),
    },
    {
      header: (
        <Image src="/images/bag-03.svg" alt="bag" width={24} height={24} />
      ),
      content: 'Pool Cap',
      value: (
        <input
          className="font-rubik text-[17px] leading-[20px] tracking-[-0.24px] focus:border-none focus:outline-none text-right placeholder:text-muted placeholder:font-rubik placeholder:text-[17px] placeholder:leading-[20px] placeholder:tracking-[-0.24px] text-primary bg-[#F05E1A] w-20 "
          type="text"
          onChange={e => setParticipant(Number(e.currentTarget.value))}
          placeholder="Unlimit"
        />
      ),
    },
    {
      header: (
        <Image
          src="/images/ideate-line-timer5.svg"
          alt="timer"
          width={24}
          height={24}
        />
      ),
      content: 'Pool Duration',
      value: (
        <input
          className="font-rubik text-[17px] leading-[20px] tracking-[-0.24px] focus:border-none focus:outline-none text-right placeholder:text-muted placeholder:font-rubik placeholder:text-[17px] placeholder:leading-[20px] placeholder:tracking-[-0.24px] text-primary bg-[#F05E1A] w-20  "
          type="text"
          onChange={e => setParticipant(Number(e.currentTarget.value))}
          placeholder="30 mins"
        />
      ),
    },
  ];

  return (
    <div className="h-full bg-[#EE4C00] pt-[26px]">
      <div className="flex flex-col items-center">
        {/* Tile */}
        <LoadTitle className="text-[#EE4C00] mb-[20px]">
          💰 Create New Pool 💰
        </LoadTitle>

        {/* Change Currency */}
        <div className="w-[90vw] grid gap-[16px]">
          <Menu bgColor="#F05E1A" borderColor="rgba(255, 255, 255, 0.30)">
            <MenuItem
              height={60}
              header={
                selectedToken ? (
                  <Image
                    src={selectedToken.icon!}
                    alt="ethereum"
                    width={32}
                    height={32}
                    unoptimized
                  />
                ) : null
              }
              content={
                selectedToken ? (
                  <div className="flex flex-col">
                    <p className="font-rubik text-[17px] leading-[20px] tracking-[-0.24px] text-white">
                      {selectedToken.symbol}
                    </p>
                    <p className="font-rubik text-[13px] leading-[18px] tracking-[-0.24px] text-muted">
                      {selectedToken.chain.name}
                    </p>
                  </div>
                ) : null
              }
              navigation
              value="Change"
              url="/select-currency"
            />
          </Menu>

          {/* Input */}
          <Menu bgColor="#F05E1A" borderColor="rgba(255, 255, 255, 0.30)">
            {inputList.map((item, index) => (
              <>
                <MenuItem
                  key={index}
                  header={item.header}
                  value={item.value}
                  content={
                    <div className="text-primary font-rubik text-[17px] leading-[22px] flex items-center">
                      {item.content}
                    </div>
                  }
                  className="h-[60px]"
                />
                {index !== inputList.length - 1 && (
                  <MenuDivider borderColor="rgba(255, 255, 255, 0.30)" />
                )}
              </>
            ))}
          </Menu>
        </div>

        {totalAmount && participant ? (
          <div className="mt-[13px] mx-auto">
            <p className="font-rubik text-[17px] leading-[28px] text-white text-center">
              {selectedToken?.symbol}
            </p>
            <p className="font-rubik text-[44px] font-semibold leading-[28px] text-white text-center mt-[10px]">
              {totalAmount}
            </p>
          </div>
        ) : (
          <p className="text-primary w-[214px] mx-auto mt-[15px] text-[15px] text-center leading-[20px] tracking-[-0.24px]">
            Please enter the total amount and participant limit
          </p>
        )}
      </div>

      <div className="mt-[36px] flex flex-col items-center gap-[16px]">
        <Image
          src="/images/games/festival.svg"
          alt="gift"
          width={52}
          height={55}
        />
        <LoadTitle className="text-[#EE4C00] uppercase">
          Lucky Draw
        </LoadTitle>
        <Link
          href="/money-gun/how-to-play"
          className="text-white font-rubik text-[15px] underline"
        >
          How to play
        </Link>
      </div>
    </div>
  );
}
