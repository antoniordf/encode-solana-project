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

  const manageCompetition = async (name: string) => {
    if(!program) return

    return program.methods.manageCompetition(name, {
      accounts: {
        competition: wallet?.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      },
      signers: [wallet?.publicKey],
    })
  }

  const buyTickets = async (account: anchor.web3.PublicKey, amount: number) => {
    if(!program) return

    return program.methods.buyTickets(amount, {
      accounts: {
        competition: account,
        user: wallet?.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      },
      signers: [wallet?.publicKey],
    })
  }

  const getCompetitions = async () => {
    if(!program) return

    return program.account.competitionModel.all()
  }

  return { program, getCompetitions, manageCompetition, buyTickets }
}
