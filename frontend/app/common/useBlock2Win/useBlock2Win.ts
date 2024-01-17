import { useEffect, useState } from 'react'
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react'
import * as anchor from '@project-serum/anchor'

import IDL from '../../../idl/blocktowin.json'
import { blocktowinContractAddress } from '../constants'

export const useBlock2Win = () => {
  const wallet = useAnchorWallet()
  const connection = useConnection()

  const [program, setProgram] = useState<anchor.Program | null>(null)

  useEffect(() => {
    if(!wallet || !connection) return

    const anchorConnection = new anchor.web3.Connection(
      connection?.connection?.rpcEndpoint,
      connection?.connection?.commitment,
    )

    const anchorProvider = new anchor.AnchorProvider(
      anchorConnection,
      wallet,
      { preflightCommitment: connection?.connection?.commitment },
    )

    const _program = new anchor.Program(
      JSON.parse(JSON.stringify(IDL)),
      blocktowinContractAddress,
      anchorProvider,
    )
    setProgram(_program)
  }, [wallet, connection, blocktowinContractAddress])

  return { program }
}
