import './App.css';
import Logo from './logo';
import { initialTranscript } from './transcriptData';
import TranscriptEditor from './TranscriptEditor';

function App() {
  return (
    <div>
    <div className='bg-black flex pt-2 pl-2  items-center'>
      <h1 className='text-white font-sans pr-1 text-lg sm:text-xl' >TRANSCRIPT EDITOR </h1>
      <Logo />
    </div>
    <div className="bg-black min-h-screen flex justify-center items-center font-mono">
      <TranscriptEditor initialTranscript={initialTranscript} />
    </div>
    </div>
  );
}

export default App;
