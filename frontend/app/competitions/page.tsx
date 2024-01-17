import { Hero } from '../modules/Hero'
import { NavBar } from '../modules/NavBar'

export default function Home() {
  return (
    <main className="bg-hero bg-cover flex min-h-screen flex-col items-center">
      <NavBar />
      <div className='w-full max-w-5xl pt-20'>
        <h1 className="text-[8rem] bg-gradient-to-r font-light from-purple-200 to-purple-900 text-transparent bg-clip-text">
          Competitions
        </h1>
        <p className="font-light text-2xl">
          Show Cards Overview
        </p>
      </div>
    </main>
  )
}
