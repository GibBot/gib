import { Title22px } from './title';

export function CreationCommand({
  title,
}: {
  title: React.ReactNode | string;
}) {
  return (
    <div className="w-full h-full bg-[#EE4C00] pt-[56px]">
      <div className="w-full flex flex-col items-center gap-[24px] px-[16px]">
        <Title22px className="text-white">{title}</Title22px>
        <div className="w-full bg-[#1C1C1F] p-[16px] rounded-[13px] flex flex-row items-center justify-between">
          <div className="text-white font-rubik text-[17px] tracking-[-0.408px]">
            @gib gun rox123 123 123
          </div>
          <div className="text-[#0A84FF] font-rubik text-[17px] tracking-[-0.408px]">
            Copy
          </div>
        </div>

        <div className="text-white font-rubik text-[15px] tracking-[-0.24px] text-center">
          Copy this command and paste it into the chat <br /> box where you
          want to send it, then click send.
        </div>
      </div>
    </div>
  );
}
