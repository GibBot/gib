/* eslint-disable @next/next/no-img-element */
import { Token, useBalance } from '@bot/model';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface TokenListProps {
  className?: string;
  onClick?: (token: Token) => void;
}

export const TokenList: React.FC<TokenListProps> = ({
  className,
  onClick,
}) => {
  const { tokens, refetch } = useBalance();
  const router = useRouter();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className={`${className}`}>
      {tokens.map((value, index) => {
        return (
          <div
            className="p-[16px] flex justify-between bg-card min-w-[260px] rounded-[13px] mb-[8px]"
            key={index}
            onClick={() => (onClick ? onClick(value) : null)}
          >
            <div className={`flex gap-[10px] items-start`}>
              <img
                src={value.icon}
                alt={value.name}
                width={35}
                height={35}
              />

              <div>
                <div className="text-primary font-rubik text-[17px] leading-[22px] flex items-center">
                  {value.symbol}
                </div>
                <div className="text-muted font-rubik text-[13px] leading-[18px] tracking-[-0.078px] ">
                  {value.name}
                </div>
                <div className="text-muted font-rubik text-[13px] leading-[18px] tracking-[-0.078px] ">
                  {value.chain.name}
                </div>
              </div>
            </div>
            <div className="mr-[16px]">
              <div className="text-primary font-rubik text-[17px] leading-[22px] tracking-[-0.408px] text-right ">
                {value.balance}
              </div>
              <div className="text-muted font-rubik text-[13px] leading-[16px] text-right">
                ${value.usdValue}
              </div>
            </div>
          </div>
        );
      })}
      {tokens.length === 0 && (
        <div className="text-center mt-5">
          <div className="text-muted">No tokens found</div>
          <div
            className=" text-sky-600 font-bold mt-1"
            onClick={() => {
              router.push('/deposit');
            }}
          >
            Deposit Now!
          </div>
        </div>
      )}
    </div>
  );
};
