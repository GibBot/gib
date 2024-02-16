import { useRouter } from 'next/router';
import Image from 'next/image';

interface GameItem {
  showElement: React.ReactNode;
  url: string;
}

export function SelectGame() {
  const router = useRouter();
  const games: GameItem[] = [
    {
      showElement: (
        <Image
          src={'/game/money-gun.png'}
          alt="money gun"
          width={398}
          height={120}
          className="h-full object-cover"
        />
      ),
      url: '/create-game/money-gun',
    },
    {
      showElement: (
        <Image
          src={'/game/lucky-draw.png'}
          alt="money gun"
          width={398}
          height={120}
          className="h-full object-cover"
        />
      ),
      url: '/create-game/lucky-draw',
    },
  ];

  return (
    <div className="w-full h-full p-[16px] mx-auto">
      <div className="w-full flex flex-col gap-[16px]">
        {games.map((game, index) => (
          <GameItemCard
            key={index}
            className="flex items-center justify-center"
            url={game.url}
          >
            {game.showElement}
          </GameItemCard>
        ))}
        <div
          className="rounded-[24px] bg-[#2C2C2D] border border-solid border-[rgba(255,255,255,0.10)] w-full h-[70px] flex items-center justify-center"
          onClick={() => {
            router.push('/balance');
          }}
        >
          <div className="text-white text-[21px] italic font-black tracking-[0.63px]">
            View My Assets
          </div>
        </div>
      </div>
    </div>
  );
}

function GameItemCard({
  className,
  children,
  url,
}: {
  className: string;
  children: React.ReactNode;
  url: string;
}) {
  const router = useRouter();

  function clickLocationGame() {
    router.push(url);
  }

  return (
    <div
      className={`rounded-[24px] border border-solid border-[rgba(255,255,255,0.10)] w-full h-[120px] flex items-center justify-center overflow-hidden ${className}`}
      onClick={() => clickLocationGame()}
    >
      {children}
    </div>
  );
}
