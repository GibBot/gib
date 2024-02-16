import { LoginProvider } from '@/components/LoginProvider';
import '@/styles/globals.css';
import { ModelProvider } from '@bot/model';
import { DisplayGate, SDKProvider } from '@tma.js/sdk-react';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import type { AppProps } from 'next/app';
import { Rubik } from 'next/font/google';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

dayjs.extend(calendar);

const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main
      className={`${rubik.variable} theme-dark bg-base w-[100vw] h-[100vh]`}
    >
      <Head>
        <title>MoneyGun</title>
      </Head>
      <SDKProvider options={{ acceptCustomStyles: true, cssVars: true }}>
        <DisplayGate>
          <ModelProvider>
            <LoginProvider>
              <Component {...pageProps} />
            </LoginProvider>
          </ModelProvider>
        </DisplayGate>
      </SDKProvider>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        bodyClassName="global-notify"
        className={'global-notify-container'}
      />
    </main>
  );
}
