'use client'

import { Button, Input, Textarea } from '@chakra-ui/react'
import React, { FC } from 'react'

import { useBlock2Win } from '@/app/common/useBlock2Win/useBlock2Win'

export const AddCompetition:FC = () => {
  const { manageCompetition } = useBlock2Win()
  const [ name, setName ] = React.useState<string>('')
  const [ description, setDescription ] = React.useState<string>('')
  const [ loading, setLoading ] = React.useState<boolean>(false)
  const [ error, setError ] = React.useState<string>('')

  const onChangeName = (e:React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const onChangeDescription = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }

  const addCompetition = async () => {
    if (!name) {
      setError('Name is required')
      return
    }

    if (!description) {
      setError('Description is required')
      return
    }

    setError('')
    setLoading(true)
    try {
      const result = await manageCompetition({
        name,
        description
      })
      console.log(result)
    } catch (e: any) {
      setError(e.message)
    }
    setLoading(false)
  }

  return (
    <div>
      <div className='max-w-xs'>
        <h2 className='font-bold text-2xl mb-2'>Add Competition</h2>
        <div className='mb-4'>  
          <Input placeholder='Name' onChange={onChangeName} />
        </div>
        <div className='mb-4'>
          <Textarea placeholder='Description' onChange={onChangeDescription} />
        </div>
        {error ? 
          <div className='mb-4'>
            <p className='text-red-500'>{error}</p>
          </div> : null
        }
        <Button colorScheme="purple" onClick={addCompetition} isLoading={loading}>Add Competition</Button>
      </div>
    </div>
  )
}
