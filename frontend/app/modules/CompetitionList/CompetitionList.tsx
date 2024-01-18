'use client'

import React, { FC, useEffect, useState } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'

import { useBlock2Win } from '@/app/common/useBlock2Win/useBlock2Win'
import { CompetitionCard } from '../CompetitionCard'
import { getDateFromTimestamp, lamportsToSol } from '@/app/common/utils'

export const CompetitionList:FC = () => {
  const { isConnected, getCompetitions } = useBlock2Win()
  const [ error, setError ] = useState<string>('')
  const [ isLoading, setisLoading ] = useState<boolean>(true)
  const [ competitions, setCompetitions ] = useState<any>(null)

  useEffect(() => {
    const _getCompetitions = async () => {
      try {
        const result = await getCompetitions()
        const accounts = result?.map((competition: any) => competition.account)
        setCompetitions(accounts)
      } catch {
        setError('Error fetching competitions')
      } finally {
        setisLoading(false)
      }
    }
    isConnected && _getCompetitions()
  }, [isConnected])
  
  const buyTickets = (id: number, amount: number) => {
    console.log("Buying tickets", id, amount)
  }

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {competitions?.length ? 
      <Grid templateColumns='repeat(3, 1fr)' gap={6}>
        {competitions.map((competition: any) => (
          <GridItem key={competition.id} w="100%">
            <CompetitionCard 
              title={competition?.title}
              id={competition?.idx}
              description={competition?.description}
              poolPrize={lamportsToSol(competition?.poolprize?.toNumber())}
              ticketCost={lamportsToSol(competition?.entrycost?.toNumber())}
              totalTickets={competition?.totaltickets?.toNumber()}
              ticketsSold={competition?.soldtickets?.toNumber()}
              maxEntries={competition?.maxentries?.toNumber()}
              openDate={getDateFromTimestamp(competition?.opendate?.toNumber())}
              closeDate={getDateFromTimestamp(competition?.closedate?.toNumber())}
              onBuyTickets={buyTickets}
            />
          </GridItem>
        ))}
      </Grid> : isLoading ? null : <div>No competitions</div>}
    </div>
  )
}
