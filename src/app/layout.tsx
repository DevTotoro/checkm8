import '~/styles/globals.css';

import { Inter } from 'next/font/google';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'checkm8',
  description: 'Ticking Off Success',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className={fontSans.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
