import './App.css';
import { initialTranscript } from './transcriptData';
import TranscriptEditor from './TranscriptEditor';

function App() {
  return (
    <div className="bg-black min-h-screen flex justify-center items-center font-mono">
      <TranscriptEditor initialTranscript={initialTranscript} />
    </div>
  );
}

export default App;
