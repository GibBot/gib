import { BigButton } from '@/ui-design/bigButton';
import { getBalance, useBalance } from '@bot/model';
import { ethers } from 'ethers';
import { useState } from 'react';

export default function EditAddress({ onSave }: { onSave: () => void }) {
  const { updateAddress } = useBalance();
  const [value, setValue] = useState(
    () => getBalance()?.bindAddress ?? '',
  );

  const isValueValid = ethers.utils.isAddress(value);

  return (
    <div className="px-[16px] pt-[36px]">
      <div className="">
        <div className="font-rubik text-[22px] font-semibold leading-[28px] text-primary text-center ">
          Edit your ERC20 address
        </div>
        <div className="p-[16px] w-full rounded-[13px] bg-card  my-[24px] flex flex-col justify-between items-start ">
          <textarea
            className=" resize-none font-rubik placeholder-gray-400 h-[70px] w-full  text-white text-[17px] leading-[22px] tracking-[-0.408px] bg-transparent outline-none border-none"
            placeholder="Enter your ERC20 address"
            value={value}
            onChange={e => setValue(e.target.value)}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
          <p className="font-rubik text-muted text-[13px] leading-[18px] tracking-[-0.078px] mt-[12px]">
            This address will be used to recognize <br /> deposits and
            withdrawals.{' '}
          </p>
          {/* <Image src={Scan} alt="scan" width={24} height={24} /> */}
        </div>
      </div>
      <BigButton
        type={value && isValueValid ? 'primary' : 'disable'}
        className="px-[16px]"
        onClick={() => {
          updateAddress(value);
          onSave();
        }}
        key={Date.now()}
      >
        {value !== '' && !isValueValid ? 'Invalid address' : 'continue'}
      </BigButton>
    </div>
  );
}
