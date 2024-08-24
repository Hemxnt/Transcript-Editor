import React, { useState } from 'react';

const TranscriptEditor = ({ initialTranscript }) => {
  const [transcript, setTranscript] = useState(initialTranscript);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Handle text edit
  const handleTextChange = (index, newText) => {
    const updatedTranscript = [...transcript];
    updatedTranscript[index].word = newText;
    setTranscript(updatedTranscript);
  };

  // Playback functionality
  const playTranscript = () => {
    setIsPlaying(true);
    transcript.forEach(({ start_time, duration }, index) => {
      setTimeout(() => {
        setCurrentTime(start_time);
        if (index === transcript.length - 1) {
          setTimeout(() => setIsPlaying(false), duration);
        }
      }, start_time);
    });
  };

  return (
    <div className="transcript-editor">
      <button
        onClick={playTranscript}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={isPlaying}
      >
        Play
      </button>
      <div className=" transcript mt-4">
        {transcript.map(({ word, start_time, duration }, index) => (
          <span
            key={index}
            className={` inline-block text-white px-2 py-1 m-1 rounded ${currentTime >= start_time && currentTime < start_time + duration ? 'bg-yellow-200' : ""}`}
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
