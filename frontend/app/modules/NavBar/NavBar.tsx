'use client'

import { Stack } from '@chakra-ui/react'
import React, { FC } from 'react'
import {
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui'

import { NavigationItem } from '../NavigationItem'


export const NavBar:FC = () => {
  return (
    <div className='bg-slate-950 w-full flex justify-center items-center'>
      <div className='max-w-5xl w-full py-6 flex justify-between items-center'>
        <div className='font-bold text-2xl'>Block2Win</div>
        <div>
          <Stack direction='row' spacing={4} className='items-center'>
            <NavigationItem to='/'>Home</NavigationItem>
            <NavigationItem to='/competitions'>Competitions</NavigationItem>
            <WalletMultiButton />
          </Stack>
        </div>
      </div>
    </div>
  )
}
