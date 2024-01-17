'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import {
    WalletModalProvider,
} from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js'

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css'
import { useMemo } from 'react';

const blocktowinContractAddress = 'FamG9VxcBpXYGeFHUgPDqVBdFMqNh3omntXwWXZpJitE';

export function Providers({ children }: { children: React.ReactNode }) {
  const network = WalletAdapterNetwork.Devnet;

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
            <ChakraProvider>{children}</ChakraProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
