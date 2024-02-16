import { useSendPkt } from '@bot/model';
import { TokenList } from '@/components/BalanceList';
import { useRouter } from 'next/router';

export default function ChangeCurrency() {
  const { setSelectedToken } = useSendPkt();
  const router = useRouter();

  return (
    <div className="px-[16px] pt-[12px]">
      <div
        className={`font-rubik text-[17px] font-medium leading-[16px] ml-[16px] text-primary pt-2 mb-4`}
      >
        My Tokens
      </div>
      <div className={`flex flex-col`}>
        <TokenList
          onClick={token => {
            setSelectedToken(token.address);
            router.back();
          }}
        />
      </div>
    </div>
  );
}
