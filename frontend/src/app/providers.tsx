'use client';

import * as React from 'react';
import {
  getDefaultConfig,
  RainbowKitProvider,
  lightTheme
} from '@rainbow-me/rainbowkit';
import { 
  phantomWallet, 
  metaMaskWallet, 
  rainbowWallet, 
  walletConnectWallet 
} from '@rainbow-me/rainbowkit/wallets';
import '@rainbow-me/rainbowkit/styles.css';
import { WagmiProvider, http } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base, sepolia } from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from '@tanstack/react-query';
import { UserProvider } from '@/context/UserContext';
import { CustomRainbowAvatar } from '@/components/CustomRainbowAvatar';
import { EmailProvider } from '@/context/EmailContext';

const config = getDefaultConfig({
  appName: 'CuteMail',
  projectId: 'YOUR_PROJECT_ID',
  chains: [sepolia],
  ssr: true,
  transports: {
    [sepolia.id]: http('https://sepolia.infura.io/v3/'),
  },
  wallets: [
    {
      groupName: 'Recommended',
      wallets: [phantomWallet, metaMaskWallet, rainbowWallet, walletConnectWallet],
    },
  ],
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <EmailProvider>
            <RainbowKitProvider 
              avatar={CustomRainbowAvatar}
              theme={lightTheme({
                accentColor: '#000',
                accentColorForeground: '#FFF',
                borderRadius: 'none',
                fontStack: 'system',
                overlayBlur: 'small',
              })}
            >
              {children}
            </RainbowKitProvider>
          </EmailProvider>
        </UserProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
