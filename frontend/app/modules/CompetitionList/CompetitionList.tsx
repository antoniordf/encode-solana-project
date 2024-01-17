'use client'

import React, { FC, useEffect, useState } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'

import { temporaryCompetitions } from '@/app/common/constants'
import { useBlock2Win } from '@/app/common/useBlock2Win/useBlock2Win'
import { CompetitionCard } from '../CompetitionCard'

export const CompetitionList:FC = () => {
  const { isConnected, getCompetitions } = useBlock2Win()
  const [ competitions, setCompetitions ] = useState<any>(temporaryCompetitions)

  useEffect(() => {
    const _getCompetitions = async () => {
      const result = await getCompetitions()
      setCompetitions(result)
    }
    // isConnected && _getCompetitions()
  }, [isConnected])
  
  const buyTickets = (id: number, amount: number) => {
    console.log("Buying tickets", id, amount)
  }

  return (
    <div>
      <Grid templateColumns='repeat(3, 1fr)' gap={6}>
        {competitions.map((competition: any) => (
          <GridItem key={competition.id} w="100%">
            <CompetitionCard 
              title={competition.name}
              id={competition.id}
              description={competition.description}
              poolPrize={competition.poolPrize}
              ticketCost={competition.ticketCost}
              totalTickets={competition.totalTickets}
              ticketsSold={competition.ticketsSold}
              maxEntries={competition.maxEntries}
              openDate={competition.openDate}
              closeDate={competition.closeDate}
              onBuyTickets={buyTickets}
            />
          </GridItem>
        ))}
      </Grid>
    </div>
  )
}
