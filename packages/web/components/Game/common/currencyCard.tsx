import Image from 'next/image';

export function CurrencyCard({
  image,
  symbol,
  chain,
  rightPart,
  theme = 'dark',
  className,
}: {
  image: string;
  symbol: string;
  chain: string;
  rightPart?: React.ReactNode;
  theme?: 'dark' | 'light';
  className?: string;
}) {
  return (
    <div
      className={`flex flex-row items-center justify-between py-[6px] pl-[6px] pr-[16px] rounded-[50px] ${
        theme === 'dark' ? 'bg-black' : 'bg-[#FFFFFF59]'
      } ${className}`}
    >
      <div className="flex flex-row items-center gap-[8px]">
        <Image
          src={image}
          alt={symbol}
          width={32}
          height={32}
          className="w-[32px] h-[32px] rounded-full overflow-hidden"
        />
        <div className="flex flex-col items-start font-rubik">
          <div
            className={`text-[17px] font-medium ${
              theme === 'dark' ? 'text-white' : 'text-black'
            } leading-[17px]`}
          >
            {symbol}
          </div>
          <div
            className={`${
              theme === 'dark' ? 'text-[#EBEBF599]' : 'text-[#00000099]'
            } text-[12px] leading-[13px]`}
          >
            {chain}
          </div>
        </div>
      </div>
      <div>{rightPart}</div>
    </div>
  );
}
