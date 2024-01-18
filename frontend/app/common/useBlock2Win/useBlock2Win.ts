import { useEffect, useState } from 'react'
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react'
import * as anchor from '@coral-xyz/anchor'

import IDL from '../../../idl/blocktowin.json'
import { blocktowinContractAddress } from '../constants'
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey'
import { PublicKey } from '@solana/web3.js'

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

  const manageCompetition = async ({ name, description }: {name: string, description: string}) => {
    if(!program) return
    const owner = 'HgDCYQefJ2eWbi4MKXLhuNTVAYzVyD6pxrWnk79Zqs57'
    const [competition] = findProgramAddressSync(
      [
        anchor.utils.bytes.utf8.encode('manage-competition'),
        wallet!.publicKey.toBuffer(),
      ],
      program.programId
    )

  return program.methods.manageCompetition(
      name,
      description,
    ).accounts({
      competition,
      owner: new PublicKey(owner),
    })
    .rpc()
  }

  const buyTickets = async (publicKey: anchor.web3.PublicKey, amount: number) => {
    if(!program) return
    
    return program.methods.buyTickets(wallet!.publicKey, amount).accounts({
      competition: publicKey,
    })
    .rpc()
  }

  const getCompetitions = async () => {
    if(!program) return

    return program.account.competitionModel.all()
  }

  return { program, getCompetitions, manageCompetition, buyTickets, isConnected: !!program }
}
