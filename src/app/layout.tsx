import '~/styles/globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

import { cn } from '~/lib/utils';
import { ThemeProvider } from '~/components/theme/theme-provider';
import { TooltipProvider } from '~/components/ui/tooltip';
import { Toaster } from '~/components/ui/sonner';
import { TRPCReactProvider } from '~/trpc/react';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'checkm8',
  description: 'Ticking Off Success',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
            <TooltipProvider>
              <TRPCReactProvider>
                {children}
                <Toaster />
              </TRPCReactProvider>
            </TooltipProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
