import './App.css'
import { DiscoverPlayer } from './components/DiscoverPlayer'
import { InfoContainer } from './components/InfoContainer'

function App() {
  return (
    <main className='grid grid-cols-1 lg:grid-cols-2 w-screen h-screen items-center gap-4'>
      <div className='flex justify-center items-center'>
        <DiscoverPlayer />
      </div>
      <div className='flex justify-end pr-4 sm:justify-center'>
        <InfoContainer />
      </div>
    </main>
  )
}

export default App