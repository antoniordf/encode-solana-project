import React, { FC } from 'react'
import { Button, Input, Progress } from '@chakra-ui/react'
import Image from 'next/image'

interface CompetitionCardProps {
  title: string
  id: number,
  description: string
  poolPrize: number
  ticketCost: number
  totalTickets: number
  ticketsSold: number
  maxEntries: number
  openDate: Date
  closeDate: Date
  onBuyTickets: (id: number, amount: number) => void
}

export const CompetitionCard:FC<CompetitionCardProps> = ({ title, description, poolPrize, id, ticketCost, totalTickets, ticketsSold, maxEntries, openDate, closeDate, onBuyTickets }) => {
  const [ amount, setAmount ] = React.useState<number>(0)
  const [ error, setError ] = React.useState<string>('')
  
  const onClick = () => {
    setError('')

    if (!isOpen()) {
      setError('Competition is closed')
      return
    }

    if (!amount) {
      setError('Incorrect amount')
      return
    }

    if (amount > maxEntries) {
      setError('Amount exceeds max entries')
      return
    }

    onBuyTickets(id, amount)
  }

  const onSetAmount = (e:React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(e.target.value, 10))
  }

  const isOpen = () => openDate <= new Date() && closeDate >= new Date()
  
  return (
    <div className='bg-transparent border-slate-800 border rounded-md'>
      <div className='flex justify-center items-center flex-col mb-0 p-6'>
        <Image src='/solana-sol-logo.png' width={50} height={50} alt='solana' />
        <span className='font-bold text-4xl'>{poolPrize}</span>
      </div>
      <div className='px-6'>
        <h2 className='font-bold text-lg'>{title}</h2>
        <p className='text-sm'>{description}</p>
        <div className='text-sm font-bold mt-4'>
          Ticket Price: {ticketCost} SOL <br/>
          Max entries: {maxEntries} <br/>
          { openDate ? `Opens: ${openDate.toLocaleString()}` : null } <br/>
          { closeDate ? `Closes: ${closeDate.toLocaleString()}` : null }
        </div>
        <div className='flex'>
          <div className='w-1/2'>
            {}
          </div>
          <div className='w-1/2'>

          </div>
        </div>
        <div className='mt-6'>
          <div className='text-sm font-bold'>Tickets Sold</div>
          <Progress value={ticketsSold} max={totalTickets} />
        </div>
      </div>
      <div className='flex flex-col justify-between items-center p-6 pb-0'>

        <Input className='w-full mb-4' placeholder='Amount' onChange={onSetAmount}/>
        <Button colorScheme="purple" onClick={onClick} className='w-full' isDisabled={!isOpen() ? true : false}>{isOpen() ? 'Buy Tickets' : 'Too late'}</Button>
        <div className='h-6 flex justify-center items-center mt-1'>{error ? 
          <div className=''>
            <p className='text-red-500 text-xs font-bold'>{error}</p>
          </div> : null
        }</div>
      </div>
    </div>
  )
}
