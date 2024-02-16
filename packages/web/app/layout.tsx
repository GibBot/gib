/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import '../styles/globals.css';

const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik',
});

export const metadata: Metadata = {
  title: 'Gib',
  description: 'Gib game',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={`${rubik.variable} theme-dark bg-base h-[100vh]`}>
        {children}
      </body>
    </html>
  );
}
