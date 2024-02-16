import { List } from '@/ui-design/list';
import { getExplorerUrl, shortenAddress } from '@/utils';
import { trpc } from '@bot/model';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();
  const { transactionId } = router.query;
  const { data: tx } = trpc.user.getTransactionById.useQuery(
    { transactionId: Number(transactionId) },
    { enabled: !!transactionId },
  );

  const txType = tx?.type;

  if (!tx) return null;

  const information = [
    {
      title: (
        <div className="font-rubik text-[13px] text-muted leading-[18px]">
          Status
        </div>
      ),
      description: (
        <div className="font-rubik text-[17px] text-primary leading-[22px]">
          Success
        </div>
      ),
    },
    {
      title: (
        <div className="font-rubik text-[13px] text-muted leading-[18px]">
          {txType &&
            (txType === 'WITHDRAW' || txType === 'SEND') &&
            `Withdraw`}
          {txType &&
            (txType === 'DEPOSIT' || txType === 'GRAB') &&
            `Deposit`}{' '}
          fee
        </div>
      ),
      description: (
        <div className="font-rubik text-[17px] text-primary leading-[22px]">
          {`${tx.amount} ${tx?.token.symbol}`}
        </div>
      ),
    },
    {
      title: (
        <div className="font-rubik text-[13px] text-muted leading-[18px]">
          {txType && (txType === 'WITHDRAW' || txType === 'SEND') && `to`}
          {txType && (txType === 'DEPOSIT' || txType === 'GRAB') && `from`}
        </div>
      ),
      description: (
        <div className="font-rubik text-[13px] text-primary leading-[22px]">
          {`${tx.from}`}
        </div>
      ),
    },
  ];

  return (
    <div className="theme-dark bg-base w-[100vw] min-h-screen ">
      <div className="px-[16px] pt-[12px]">
        <div className="px-[8px] mt-10">
          <div className="flex items-center gap-[8px]">
            <Image
              src={tx.token.icon}
              unoptimized
              alt="ethereum"
              width={32}
              height={32}
            />
            <p className="text-primary text-[15px] font-rubik">
              {txType &&
                txType === 'WITHDRAW' &&
                `Withdraw to ${shortenAddress(tx.to)}`}
              {txType &&
                txType === 'DEPOSIT' &&
                `Deposit from ${shortenAddress(tx.from)}`}
            </p>
          </div>
          <div className="my-[8px]">
            <p className="text-primary font-rubik text-[48px] font-medium">
              {`${tx.amount} `}
              <span className="text-muted font-rubik text-[32px] font-medium inline">
                {tx.token.symbol}
              </span>
            </p>
            <p className="text-muted font-rubik text-[15px]">
              {dayjs(tx.time).calendar()}
            </p>
          </div>
        </div>
        {txType && (txType === 'WITHDRAW' || txType === 'SEND') && (
          <div className="py-[12px] px-[16px] bg-card rounded-[13px] text-link font-rubik text-[17px] leading-[22px] tracking-[-0.408px] mt-8">
            Send again
          </div>
        )}
        <div className="mt-[24px] ">
          <p className="uppercase pl-[8px] pb-[8px] font-rubik text-muted leading-[16px] text-[14px]">
            Payment Details
          </p>
          <List list={information} />
        </div>
        {tx.txId && (
          <a target="_blank" href={getExplorerUrl(tx.chain, tx.txId!)}>
            <div className="py-[12px] px-[16px] bg-card rounded-[13px] text-link font-rubik text-[17px] leading-[22px] tracking-[-0.408px] mt-5">
              View in Blockchain Explorer
            </div>
          </a>
        )}
      </div>
    </div>
  );
}
