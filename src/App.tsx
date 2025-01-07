import './App.css'
import { DiscoverPlayer } from './components/DiscoverPlayer'
import { InfoContainer } from './components/InfoContainer'
import { ShowHiddenPlayer } from './components/ShowHiddenPlayer'

function App() {
  return (
    <main className='bg-gray-100 flex flex-col items-center justify-center'>
      <div className='grid grid-cols-1 lg:grid-cols-2 w-full h-screen items-center justify-items-center'>
        <div className='flex justify-center items-center'>
          <DiscoverPlayer />
        </div>
        <div className='flex justify-end pr-4 sm:justify-center'>
          <InfoContainer />
        </div>
      </div>
      <ShowHiddenPlayer></ShowHiddenPlayer>
    </main>
  )
}

export default App