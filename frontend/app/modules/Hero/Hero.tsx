'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

export const Hero:FC = ({}) => {
   return (
    <div className="relative mt-48 w-full max-w-5xl flex justify-between items-center after:absolute after:-z-20 after:h-[360px] after:w-[480px] after:translate-x-1/3 after:bg-gradient-conic after:from-purple-400 after:via-emerald-400 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-emerald-700 before:dark:opacity-10 after:dark:from-purple-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
      <div className="flex flex-col">
        <div className="text-[8rem] bg-gradient-to-r font-light from-purple-200 to-purple-900 text-transparent bg-clip-text">
          Win Sol!
        </div>
        <p className="font-light text-2xl">
          Every week we give away 1000 SOL. <br/> Enter now for a chance to win!
        </p>
        <div className='mt-8 z-20'>
          <Link href='/competitions' className='p-4 bg-purple-500 text-white rounded-md font-bold'>View Competitions</Link>
        </div>
      </div>
      <div>
        <Image alt="Solana" src="/solana.svg" width={200} height={200} />
      </div>
    </div>
   )
}
