import { Introduce, IntroduceProps } from '@/ui-design/introduce';
import Image from 'next/image';

interface CardItem extends IntroduceProps {
  onClick: () => void;
}

export interface CardListProps {
  itemList: CardItem[];
  className?: string;
  sayInfo?: {
    tokenId: string;
    chainId: number;
    wallet: string;
    amount: number;
  };
}

// 待重构
export const SendModesList: React.FC<CardListProps> = ({
  itemList,
  className,
}) => {
  // async function handleSendMoney() {
  //   try {
  //     const result = await trpcNormal.fee.confirmWithdraw.mutate({
  //       token: sayInfo.tokenId,
  //       chainId: sayInfo.chainId,
  //       wallet: sayInfo.wallet,
  //       amount: sayInfo.amount,
  //     });
  //     if (result) console.log('success');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <div className={className}>
      {itemList.map((value, index) => {
        return (
          <div
            className="p-[16px] flex justify-between bg-card min-w-[260px] rounded-[13px] my-[8px]"
            key={index}
            onClick={() => value.onClick()}
          >
            <Introduce
              icon={value.icon}
              title={value.title}
              description={value.description}
              className="items-center"
            />
            <div className="mr-[16px] flex items-center">
              <Image
                src="images/right-arrow.svg"
                alt="arrow"
                width={7}
                height={12}
                className="inline ml-[12px]"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
