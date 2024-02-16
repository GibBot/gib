import { useThemeStore } from '@/lib/store';

export function SwitchThemeButton() {
  const theme = useThemeStore(state => state.theme);
  const setTheme = useThemeStore(state => state.setTheme);

  const switchTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <button
      className={`theme-${theme} bg-black rounded-[50%] w-[32px] h-[32px] flex justify-center items-center absolute right-10 bottom-10 z-10`}
      onClick={() => switchTheme()}
    >
      Switch
    </button>
  );
}
