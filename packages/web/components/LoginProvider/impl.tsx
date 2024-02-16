import { trpcNormal, useUser } from '@bot/model';
import {
  useBackButton,
  useLaunchParams,
  useMainButton,
  useMiniApp,
  useViewport,
} from '@tma.js/sdk-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

let defaultRoute = (() => {
  try {
    return window.location.pathname;
  } catch (err) {
    return '';
  }
})();

export const changeDefaultRoute = (path: string) => {
  defaultRoute = path;
};

export default function LoginProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLogin, setUser } = useUser();

  const launchParams = useLaunchParams();
  const router = useRouter();

  const tgIdFromQuery = router.query.tgId;
  const telegramId =
    launchParams.initData?.user?.id ?? Number(tgIdFromQuery);

  const bckBtn = useBackButton();
  const miniApp = useMiniApp();
  const viewport = useViewport();
  const mainBtn = useMainButton();

  useEffect(() => {
    miniApp.ready();
    viewport.expand();
  }, []);

  // 自动登录
  useEffect(() => {
    if (isLogin) return;
    if (!telegramId) return;

    const impl = async () => {
      const res = await trpcNormal.user.loginByTelegramId.mutate({
        telegramId,
      });

      setUser({
        ...user,
        ...res,
        telegramId,
      });
    };

    impl();
  }, [isLogin, user, setUser, telegramId]);

  useEffect(() => {
    const root = [defaultRoute];
    if (!root.includes(router.pathname)) {
      router.beforePopState;
      bckBtn.show();
      mainBtn.hide();
      bckBtn.on('click', () => {
        router.back();
      });
    } else {
      bckBtn.hide();
      mainBtn.show();
    }
  }, [router.pathname]);

  if (!isLogin) {
    return <div className="w-[100vw] h-[100vh]">{''}</div>;
  }

  return children;
}
