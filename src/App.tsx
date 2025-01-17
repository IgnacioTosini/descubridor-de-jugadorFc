import './App.css';
import { DiscoverPlayer } from './components/DiscoverPlayer';
import { InfoContainer } from './components/InfoContainer';
import { ShowHiddenPlayer } from './components/ShowHiddenPlayer';

function App() {
  return (
    <main className='bg-gray-100 flex flex-col items-center justify-center min-h-screen'>
      <div className='grid grid-cols-1 lg:grid-cols-2 w-full items-center justify-items-center gap-4'>
        <div className='flex justify-center items-center flex-shrink-0'>
          <DiscoverPlayer />
        </div>
        <div className='flex justify-end pr-4 sm:justify-center'>
          <InfoContainer />
        </div>
      </div>
      <div className='w-full flex justify-center mt-8'>
        <ShowHiddenPlayer />
      </div>
    </main>
  );
}

export default App;