import { Flex, Spacer } from '@chakra-ui/react'

import { AddCompetition } from '../modules/AddCompetition'
import { CompetitionList } from '../modules/CompetitionList'
import { NavBar } from '../modules/NavBar'

export default function Home() {
  return (
    <main className="bg-hero bg-cover flex min-h-screen flex-col items-center mb-48">
      <NavBar />
      <div className='w-full max-w-5xl pt-20'>
        <h1 className="text-[8rem] bg-gradient-to-r font-light from-purple-200 to-purple-900 text-transparent bg-clip-text">
          Competitions
        </h1>
        <Flex>
          <div>
            <AddCompetition />
          </div>
          <p className="font-light text-2xl ml-8">
            <CompetitionList />
          </p>
        </Flex>
      </div>
    </main>
  )
}
