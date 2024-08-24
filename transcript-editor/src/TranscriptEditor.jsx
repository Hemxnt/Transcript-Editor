import React, { useEffect, useRef, useState } from 'react';

const TranscriptEditor = ({ initialTranscript }) => {
  const [transcript, setTranscript] = useState(initialTranscript);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  // Added ref to store the timeout IDs
  const timeoutsRef = useRef([]);
  
  // Handle text edit
  const handleTextChange = (index, newText) => {
    const updatedTranscript = [...transcript];
    updatedTranscript[index].word = newText;
    setTranscript(updatedTranscript);
  };

  const togglePlayback = () => {
    if (isPlaying) {
      pauseTranscript();
    } else {
      playTranscript();
    }
  };

  // Playback functionality
  const playTranscript = () => {
    setIsPlaying(true);
    const startTime = Date.now() - currentTime;

    transcript.forEach(({ start_time, duration }, index) => {
      const timeout = setTimeout(() => {
        setCurrentTime(start_time);
        if (index === transcript.length - 1) {
          setTimeout(() => setIsPlaying(false), duration);
        }
      }, start_time - (Date.now() - startTime));
      timeoutsRef.current.push(timeout);
    });
  };

  const pauseTranscript = () => {
    setIsPlaying(false);
    // Clear all timeouts to stop the playback
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  // Cleanup effect to clear timeouts when component unmounts
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);


  return (
    <div className="transcript-editor">
      <button
        onClick={togglePlayback}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <div className="transcript mt-4">
        {transcript.map(({ word, start_time, duration }, index) => (
          <span
            key={index}
            className={`inline-block text-white px-2 py-1 m-1 rounded-2xl ${
              currentTime >= start_time && currentTime < start_time + duration
                ? 'border-2 border-yellow-400'
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