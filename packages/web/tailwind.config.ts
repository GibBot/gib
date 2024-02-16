import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './ui-design/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      textColor: {
        primary: 'var(--color-text-base)',
        muted: 'var(--color-text-muted)',
        secondary: 'var(--color-text-secondary)',
        link: 'var(--color-text-link)',
        tips: 'var(--color-text-tips)',
        'action-button-word': 'var(--color-action-button-word)',
        'add-money': 'var(--color-text-add-money)',
      },
      fontFamily: {
        rubik: ['var(--font-rubik)'],
        'RealTextPro-Black': ['--font-RealTextPro-Black'],
        'RealTextPro-ExtraBold': ['--font-RealTextPro-ExtraBold'],
      },
      backgroundColor: {
        base: 'var(--color-bg)',
        card: 'var(--color-bg-card)',
        'button-disable': 'var(--color-button-disable)',
        'button-primary': 'var(--color-button-primary)',
        'action-button': 'var(--color-action-button)',
        'button-secondary': 'var(--color-button-secondary)',
      },
      borderColor: {
        muted: 'var(--color-border-muted)',
      },
    },
  },
  plugins: [],
};
export default config;
