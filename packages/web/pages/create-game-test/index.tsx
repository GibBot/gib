import { BigButton } from '@/ui-design/bigButton';
import { LinkCard } from '@/ui-design/linkCard';
import { LinkWord } from '@/ui-design/linkWord';
import { List } from '@/ui-design/list';
import { NumInput } from '@/ui-design/numInput';
import { useBalance, useSendPkt } from '@bot/model';
import { useMainButton, useMiniApp } from '@tma.js/sdk-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function SendMoney() {
  const { tokens } = useBalance();

  const {
    selectedToken,
    totalAmount,
    participant,
    setParticipant,
    setTotalAmount,
  } = useSendPkt();

  const router = useRouter();
  const mainBtn = useMainButton();
  const miniApp = useMiniApp();

  const buttonDisabled =
    totalAmount === 0 || participant === 0 || tokens.length === 0;

  function clickChange() {
    router.push('/select-currency');
  }

  useEffect(() => {
    if (buttonDisabled) {
      mainBtn.setBackgroundColor('#4F4F4F');
      mainBtn.setText('Send to Chat');
      mainBtn.show();
      mainBtn.disable();
    } else {
      mainBtn.setBackgroundColor('#d1232a');
      mainBtn.enable();
      mainBtn.setText('Send to Chat');
      mainBtn.show();
      mainBtn.on('click', () => {
        // send();
        miniApp.switchInlineQuery('send');
        // miniApp.close();
      });
    }

    return () => {};
  }, [buttonDisabled]);

  if (tokens.length === 0) {
    return (
      <div className="flex flex-1 h-full w-full flex-col justify-center items-center">
        <div className="text-primary text-xl mb-3">{`You don't have any tokens to send`}</div>
        <BigButton
          type="primary"
          className="w-[250px]"
          onClick={() => {
            router.push('/deposit');
          }}
        >
          Deposit
        </BigButton>
      </div>
    );
  }

  return (
    <div className="">
      <div className=" px-[16px] pt-[12px]">
        <LinkWord className="text-right block" href={'/my-token'}>
          View My Token{' '}
        </LinkWord>
        <LinkCard
          title={
            selectedToken ? (
              <>
                {selectedToken.symbol}
                {/* <Image
                  src={selectedToken.icon}
                  alt="Vector"
                  width={16}
                  height={16}
                  className="inline ml-[4px]"
                  unoptimized
                /> */}
              </>
            ) : null
          }
          description={selectedToken?.chain.name}
          className="mx-auto h-[60px] my-[16px]"
          linkWord="Change"
          onClick={() => clickChange()}
          icon={
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
        />
        <LinkWord className="ml-[16px] leading-[28px]" href={''}>
          Random Amount{' '}
          <Image
            src="images/down-arrow.svg"
            alt="arrow"
            width={16}
            height={16}
            className="inline ml-[4px]"
          />
        </LinkWord>
        <List
          list={[
            {
              icon: (
                <Image
                  src="images/coin-stacked.svg"
                  alt="coin stacked"
                  width={24}
                  height={24}
                />
              ),
              title: 'Total',
              children: (
                <NumInput
                  className="font-rubik text-[17px] leading-[20px] tracking-[-0.24px] text-muted bg-card w-20 "
                  type="number"
                  value={totalAmount}
                  onChange={e =>
                    setTotalAmount(Number(e.currentTarget.value))
                  }
                  placeholder="0.00"
                />
              ),
            },
            {
              icon: (
                <Image
                  src="images/gift.svg"
                  alt="gift"
                  width={24}
                  height={24}
                />
              ),
              title: 'Participants',
              children: (
                <NumInput
                  className="font-rubik text-[17px] leading-[20px] tracking-[-0.24px] text-muted bg-card w-21 "
                  type="text"
                  value={participant}
                  onChange={e =>
                    setParticipant(Number(e.currentTarget.value))
                  }
                  placeholder="Enter quantity"
                />
              ),
            },
          ]}
        />
        {totalAmount && participant ? (
          <div className="mt-[63px] mx-auto">
            <p className="font-rubik text-[17px] leading-[28px] tracking-[-0.519px] text-white text-center">
              {selectedToken?.symbol}
            </p>
            <p className="font-rubik text-[44px] font-semibold leading-[28px] tracking-[-0.519px] text-white text-center mt-[14px]">
              {totalAmount}
            </p>
          </div>
        ) : (
          <p className="font-rubik text-primary w-[214px] mx-auto mt-10 text-[15px] text-center leading-[20px] tracking-[-0.24px]">
            {' '}
            Please enter the total amount and participant limit
          </p>
        )}
      </div>
      <div className="mt-[30px] flex justify-center flex-col items-center w-full px-[16px]">
        <p className="font-rubik text-tips mx-auto mb-[42px] text-[13px] text-center leading-[20px] tracking-[-0.24px]">
          Money Guns not opened within 24hrs will be refunded.
        </p>
      </div>
    </div>
  );
}
