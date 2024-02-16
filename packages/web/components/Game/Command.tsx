import {
  useBackButton,
  useMainButton,
  useMiniApp,
} from '@tma.js/sdk-react';
import { useEffect } from 'react';
import { Title22px } from './common/title';
import { toast } from 'react-toastify';

export function GameCommand({ game }: { game: string }) {
  const mainBtn = useMainButton();
  const miniApp = useMiniApp();
  const bckBtn = useBackButton();

  const command = `@GibmoneyBot send:${game}`;

  useEffect(() => {
    setTimeout(() => {
      mainBtn.setBackgroundColor('#EE4C00');
      mainBtn.enable();
      mainBtn.setText('Copy and Send');

      mainBtn.on('click', async () => {
        await navigator.clipboard.writeText(command);
        miniApp.switchInlineQuery(command);
      });
      bckBtn.hide();
    }, 100);
  }, []);

  return (
    <CreationCommand
      title="your Money Gun Creation Command"
      command={command}
    />
  );
}

function CreationCommand({
  title,
  command,
}: {
  title: React.ReactNode | string;
  command: string;
}) {
  return (
    <div className="w-full h-full bg-[#EE4C00] pt-[56px]">
      <div className="w-full flex flex-col items-center gap-[24px] px-[16px]">
        <Title22px className="text-white">{title}</Title22px>
        <div className="w-full bg-[#1C1C1F] p-[16px] rounded-[13px] flex flex-row items-center justify-between">
          <div className="text-white font-rubik text-[17px] tracking-[-0.408px]">
            {command}
          </div>
          <div
            className="text-[#0A84FF] font-rubik text-[17px] tracking-[-0.408px]"
            onClick={() => {
              toast.success('Copied to clipboard');
              navigator.clipboard.writeText(command);
            }}
          >
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
