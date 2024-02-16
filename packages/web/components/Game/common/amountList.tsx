import Image from 'next/image';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import { motion } from 'framer-motion';

dayjs.extend(calendar);

export interface AmountListItem {
  profile: string;
  username: string;
  date: string | Date;
  amount: number;
  currency: string;
  type: 'add' | 'sub';
  index?: number;
}

export function AmountList({ list }: { list: AmountListItem[] }) {
  return (
    <div className="w-full px-[16px] flex flex-col">
      {list.map((item, index) => (
        <Item key={index} {...item} index={index} />
      ))}
    </div>
  );
}

export function Item({
  profile,
  username,
  date,
  amount,
  currency,
  type,
  index,
}: AmountListItem) {
  return (
    <motion.div
      className="flex flex-row items-center gap-[16px]  w-full"
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, type: 'spring', duration: 0.5 }}
    >
      <Image
        src={profile}
        alt={username}
        width={32}
        height={32}
        className="w-[40px] h-[35px] rounded-full"
      />
      <div
        className={`flex flex-row items-center justify-between w-full py-[10px] ${
          index !== 0
            ? 'border-t-[0.5px] border-solid border-[rgba(84,84,88,0.65)]'
            : ''
        }`}
      >
        <div className="flex flex-col items-start font-rubik">
          <div className="text-[17px] font-medium text-white">
            {username}
          </div>
          <div
            className="text-[#EBEBF599] text-[13px]"
            suppressHydrationWarning
          >
            {dayjs(date).calendar()}
          </div>
        </div>
        <div
          className={`font-rubik text-[17px] text-right tracking-[-0.408px] ${
            type === 'add' ? 'text-[#2ED158]' : 'text-white'
          }`}
        >
          {type === 'add' ? '+' : ''}
          {amount} {currency}
        </div>
      </div>
    </motion.div>
  );
}
