import { useEffect, useRef, useState } from 'react';


const TranscriptEditor = ({ initialTranscript }) => {
  const [transcript, setTranscript] = useState(initialTranscript);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timeoutsRef = useRef([]); // Ref to store timeout IDs for managing playback timing


// Function to handle text changes in the transcript (edit functionality)
  const handleTextChange = (index, newText) => {
    setTranscript((prevTranscript) => {
      const updatedTranscript = [...prevTranscript];
      updatedTranscript[index].word = newText;
      return updatedTranscript;
    });
  };


 // Function to toggle playback state between play and pause
  const togglePlayback = () => {
    setIsPlaying((prevIsPlaying) => {
      if (prevIsPlaying) {
        pauseTranscript();
      } else {
        playTranscript();
      }
      return !prevIsPlaying;
    });
  };


 // Function to handle the playback of the transcript
  const playTranscript = () => {
    const startTime = Date.now() - currentTime; // Calculate start time based on current playback time

     // Loop through each word in the transcript to manage playback timing
    transcript.forEach(({ start_time, duration }, index) => {
      const timeout = setTimeout(() => {
        setCurrentTime(start_time); // Update current time to the word's start time
        if (index === transcript.length - 1) {
          setTimeout(() => {
            setIsPlaying(false);
            setCurrentTime(0);
          }, duration);
        }
      }, start_time - (Date.now() - startTime)); // Schedule the timeout based on start time
      timeoutsRef.current.push(timeout); // Store the timeout ID in the ref
    });
  };


// Function to pause the transcript playback
  const pauseTranscript = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };


// Effect to clean up timeouts when the component unmounts
  useEffect(() => {
    return () => {
      pauseTranscript(); // Clear timeouts on unmount
    };
  }, []);


  return (

    <div className="transcript-editor mx-4 sm:mx-16 md:mx-32 lg:mx-60">

      <button
        onClick={togglePlayback}
        className="font-sans font-bold text-center uppercase text-xs py-2 sm:py-3 px-4 sm:px-6 rounded-lg bg-gray-900 text-white hover:bg-gray-800"
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>

      <div className="transcript mt-4 text-sm sm:text-base"> 
        {transcript.map(({ word, start_time, duration }, index) => (
          <span
            key={index}
            className={`inline-block text-white px-1 py-1 m-1 ${
              currentTime >= start_time && currentTime < start_time + duration
                ? 'border-2 rounded-lg px-1 border-yellow-300'
                : 'border-2 border-transparent'
            }`}
            contentEditable
            onBlur={(e) => handleTextChange(index, e.target.innerText)}
            suppressContentEditableWarning={true}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TranscriptEditor;
