import { Introduce, IntroduceProps } from './introduce';

interface CardItem extends IntroduceProps {
  amount?: number;
  equivalent?: number;
}

export interface CardListProps {
  itemList: CardItem[];
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

// 待重构
export const CardList: React.FC<CardListProps> = ({
  itemList,
  className,
  onClick,
}) => {
  return (
    <div className={className}>
      {itemList.map((value, index) => {
        return (
          <div
            className="p-[16px] flex justify-between bg-card min-w-[260px] rounded-[13px] my-[8px]"
            key={index}
            onClick={onClick}
          >
            <Introduce
              icon={value.icon}
              title={value.title}
              description={value.description}
              className="items-start"
            />
            <div className="mr-[16px]">
              <p className="text-primary font-rubik text-[17px] leading-[22px] tracking-[-0.408px] text-right ">
                {value.amount}
              </p>
              <p className="text-muted font-rubik text-[13px] leading-[16px] text-right">
                ${value.equivalent}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

