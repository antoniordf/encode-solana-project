'use client'

import React, { FC, useEffect, useState } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import * as anchor from '@coral-xyz/anchor'

import { useBlock2Win } from '@/app/common/useBlock2Win/useBlock2Win'
import { CompetitionCard } from '../CompetitionCard'
import { getDateFromTimestamp, lamportsToSol } from '@/app/common/utils'

export const CompetitionList:FC = () => {
  const { isConnected, getCompetitions, buyTickets } = useBlock2Win()
  const [ error, setError ] = useState<string>('')
  const [ isLoading, setisLoading ] = useState<boolean>(true)
  const [ competitions, setCompetitions ] = useState<any>(null)

  useEffect(() => {
    const _getCompetitions = async () => {
      try {
        const competitions = await getCompetitions()
        setCompetitions(competitions)
      } catch {
        setError('Error fetching competitions')
      } finally {
        setisLoading(false)
      }
    }
    isConnected && _getCompetitions()
  }, [isConnected])

  const onBuyTickets = (account: anchor.web3.PublicKey, amount: number) => {
    try {
      buyTickets(account, amount)
    } catch {
      setError('Error buying tickets')
    }
  }

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {competitions?.length ? 
      <Grid templateColumns='repeat(3, 1fr)' gap={6}>
        {competitions.map((competition: any) => (
          <GridItem key={competition?.account?.id} w="100%">
            <CompetitionCard 
              title={competition?.account?.title}
              publicKey={competition?.publicKey}
              description={competition?.account?.description}
              poolPrize={lamportsToSol(competition?.account?.poolprize?.toNumber())}
              ticketCost={lamportsToSol(competition?.account?.entrycost?.toNumber())}
              totalTickets={competition?.account?.totaltickets?.toNumber()}
              ticketsSold={competition?.account?.soldtickets?.toNumber()}
              maxEntries={competition?.account?.maxentries?.toNumber()}
              openDate={getDateFromTimestamp(competition?.account?.opendate?.toNumber())}
              closeDate={getDateFromTimestamp(competition?.account?.closedate?.toNumber())}
              onBuyTickets={onBuyTickets}
            />
          </GridItem>
        ))}
      </Grid> : isLoading ? null : <div>No competitions</div>}
    </div>
  )
}
