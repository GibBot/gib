import { GameCommand } from '@/components/Game/Command';
import { useRouter } from 'next/router';

export default function GameCommandPage() {
  const router = useRouter();
  const game = router.query.game as string;

  return <GameCommand game={game} />;
}
