import { trpc } from '@bot/model';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/router';

export const TxList: React.FC<{
  className?: string;
}> = ({ className }) => {
  const router = useRouter();

  const { data } = trpc.user.getUserTransactions.useQuery(undefined, {
    refetchOnMount: true,
  });
  const list = data?.transactions ?? [];

  function handleLocationRecord(transactionId: number) {
    router.push(`/transaction-record?transactionId=${transactionId}`);
  }

  return (
    <div className="bg-card min-w-[260px] rounded-[13px] ">
      {list.map(
        (
          {
            token: { icon, symbol: title },
            time,
            id,
            type: txType,
            amount,
          },
          index,
        ) => {
          return (
            <div
              key={index}
              className={`${
                index !== 0 && 'border-t-[1px] border-muted border-solid '
              } flex items-center  pl-[16px] pr-[24px] min-h-[60px] justify-between  overflow-hidden overflow-ellipsis whitespace-nowrap
          hover:cursor-pointer
          `}
              onClick={() => handleLocationRecord(id)}
            >
              <div
                className={` w-full  py-[10px] flex  items-center  justify-between  overflow-hidden overflow-ellipsis whitespace-nowrap `}
              >
                <div className={`flex gap-[10px] ${className}`}>
                  <Image
                    src={icon}
                    alt={title}
                    width={30}
                    height={30}
                    unoptimized
                    className="h-[35px] w-[35px]"
                  />
                  <div>
                    <div className="text-primary font-rubik text-[17px] leading-[22px] flex items-center">
                      {title}
                    </div>
                    <div className="text-muted font-rubik text-[13px] leading-[18px] tracking-[-0.078px] ">
                      {dayjs(time).calendar()}
                    </div>
                  </div>
                </div>
                <div className={`flex flex-col gap-[2px]`}>
                  <div
                    className={`text-[17px] leading-[22px] tracking-[-0.408px] ${
                      txType === 'DEPOSIT' || txType === 'GRAB'
                        ? 'text-add-money'
                        : 'text-primary'
                    } font-rubik text-right`}
                  >
                    {txType === 'DEPOSIT' || txType === 'GRAB'
                      ? '+'
                      : null}
                    {`${amount} ${title}`}
                  </div>
                  <div
                    className={`text-[13px] ${
                      txType === 'DEPOSIT' || txType === 'GRAB'
                        ? 'text-add-money'
                        : 'text-primary'
                    } font-rubik text-right`}
                  >
                    {txType === 'DEPOSIT' || txType === 'GRAB'
                      ? 'Received'
                      : 'Sent'}
                  </div>
                </div>
              </div>
            </div>
          );
        },
      )}
    </div>
  );
};
