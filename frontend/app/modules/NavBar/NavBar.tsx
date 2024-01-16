import { Stack } from '@chakra-ui/react'
import React, { FC } from 'react'
import { NavigationItem } from '../NavigationItem'

export const NavBar:FC = () => {
   return (
    <div className='bg-slate-950 w-full flex justify-center items-center'>
      <div className='max-w-5xl w-full py-6 flex justify-between'>
        <div className='font-bold text-2xl'>Block2Win</div>
        <div>
          <Stack direction='row' spacing={4}>
            <NavigationItem to='/'>Home</NavigationItem>
            <NavigationItem to='/competitions'>Competitions</NavigationItem>
          </Stack>
        </div>
      </div>
    </div>
   )
}
