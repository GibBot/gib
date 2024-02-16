import { AccountDetail } from '@/components/AccountDetail';
import { BigButton } from '@/ui-design/bigButton';
import { useBalance } from '@bot/model';
// import { useInitData } from '@tma.js/sdk-react';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function MyToken() {
  const router = useRouter();
  // const initData = useInitData();
  const { totalUSDVal } = useBalance();

  // const avatar = initData?.user?.photoUrl;
  // const name = initData?.user?.username;

  function depositLocation() {
    router.push('/deposit');
  }

  function sendLocation() {
    router.push('/send-crypto');
  }

  return (
    <div className="p-[16px] py-[30px]">
      <div className="flex justify-between">
        <div className="flex flex-col ml-[16px]">
          <p className="font-rubik text-[15px] text-semibold text-primary">
            @Bin
          </p>
          <p className="font-rubik text-[32px] text-medium text-primary ">
            <span className="font-bold">${totalUSDVal} </span>
            <span className="text-muted text-[14px]"> USD</span>
          </p>
          <p className="text-muted text-[14px]"> Est total</p>
        </div>
        {
          <Image
            src={'/images/profile.png'}
            alt="profile"
            width={80}
            height={80}
            className="rounded-full mr-[8px] w-[86px] h-[86px]"
          />
        }
      </div>
      <div className="flex mt-6 gap-[8px] mb-0">
        <BigButton
          className="w-[50%]"
          type="action-button"
          onClick={() => depositLocation()}
        >
          <div className="flex flex-col items-center justify-center pt-1">
            <Image
              src="images/plus1.svg"
              alt="plus"
              width={24}
              height={24}
            />
            <p className="text-action-button-word text-[12px] font-rubik normal-case">
              Deposit
            </p>
          </div>
        </BigButton>
        <BigButton
          className="w-[50%]"
          type="action-button"
          onClick={() => sendLocation()}
        >
          <div className="flex flex-col items-center justify-center pt-1">
            <Image
              src="images/upload2.svg"
              alt="upload"
              width={24}
              height={24}
            />
            <p className="text-action-button-word text-[12px] font-rubik normal-case">
              Send
            </p>
          </div>
        </BigButton>
      </div>
      <AccountDetail className="mt-[30px]" />
    </div>
  );
}
