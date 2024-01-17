'use client'

import { useBlock2Win } from '@/app/common/useBlock2Win/useBlock2Win'
import React, { FC, useEffect, useState } from 'react'

export const CompetitionList:FC = () => {
  const { getCompetitions } = useBlock2Win()
  const [ competitions, setCompetitions ] = useState<any>(null)

  useEffect(() => {
    const _getCompetitions = async () => {
      const result = await getCompetitions()
      setCompetitions(result)
    }
    _getCompetitions()
  }, [])
  console.log(competitions)
  return (
    <div></div>
  )
}
