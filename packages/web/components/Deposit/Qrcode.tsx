import Copy from '@/public/images/copy.svg';
import Edit1 from '@/public/images/edit1.svg';
import Share from '@/public/images/share.svg';
import { BigButton } from '@/ui-design/bigButton';
import { useBalance } from '@bot/model';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import { toast } from 'react-toastify';

export function DepositQrcode({ onEdit }: { onEdit: () => void }) {
  const { bindAddress, depositAddress } = useBalance();

  return (
    <div className="">
      <div className="px-[16px] pt-[12px]">
        <div className="font-rubik text-[22px] font-semibold leading-[28px] text-primary text-center mt-[48px]">
          Deposit with ERC20
        </div>
        <div className="p-[32px] rounded-[26px] bg-card  my-[24px] flex justify-between items-center mx-auto flex-col max-w-[258px]">
          {depositAddress && (
            <>
              <QRCodeSVG
                className=" rounded-[5px]"
                value={depositAddress}
                size={143.33}
                fgColor="#fff"
                bgColor="#1C1C1F"
              />
              <div className="text-center font-rubik text-[15px] leading-[150%] max-w-[194px] text-primary break-words mt-[24px]">
                {depositAddress}
              </div>
              <p className="text-muted font-rubik text-[15px] leading-[150%] text-center">
                Your deposit address
              </p>
            </>
          )}
        </div>
        <p className="text-primary text-[14px] leading-[150%] md:max-w-[320px] max-md:w-[90vw] font-rubik text-center mx-auto break-words">
          To avoid assets loss, please send only{' '}
          <span className="font-semibold">ERC20</span> tokens and exactly
          from your address: {bindAddress}
        </p>
        <div
          className="text-center mt-[4.67px] block text-blue-600"
          onClick={() => onEdit()}
        >
          <Image
            src={Edit1}
            alt="edit"
            width={18}
            height={18}
            className="inline"
          />
          Change
        </div>
      </div>
      <div className="flex justify-center flex-row items-center w-full gap-[8px] px-[16px] mt-[30px]">
        <BigButton
          type="primary"
          onClick={e => {
            e.preventDefault();
            depositAddress &&
              navigator.clipboard.writeText(depositAddress);
            toast.success('Copied to clipboard');
          }}
        >
          <div className="flex justify-center">
            <Image
              src={Copy}
              alt="copy"
              width={24}
              height={24}
              className="inline"
            />
            <span className="font-rubik text-[17px] ml-[8px] text-primary font-semibold leading-[22px] uppercase">
              COPY
            </span>
          </div>
        </BigButton>
        <BigButton type="secondary">
          <div className="flex justify-center">
            <Image
              src={Share}
              alt="share"
              width={24}
              height={24}
              className="inline"
            />
            <span className="font-rubik text-[17px] ml-[8px] text-secondary font-semibold leading-[22px] uppercase">
              Share
            </span>
          </div>
        </BigButton>
      </div>
    </div>
  );
}
