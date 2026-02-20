/**
 * Challenge: Video Player
 * In this challenge, you'll give the user the ability to play and pause the
 * video. To do so, you'll need to invoke the 'play' or 'pause' methods on
 * the video element itself. You'll also want to update the UI to reflect the
 * current state of the video.
 * 
 * Tasks:
 * 1. Toggle the play state when the button is clicked
 * 2. Play and pause the video when the button is clicked
 * 
 * 
 * Hint:
 * 1. In order to be able to allow the user to control the video player, we
 *    need to add a ref to the 'video' element.
 * 
 *    const videoRef = useRef();
 *
 *    ...
 *
 *    <video ref={videoRef} poster="https://image.mux.com/TbVCJiOghmISJgg4AznPfFHYRfiVoek8OJHF56Y01oR4/thumbnail.webp">
 * 
 * 2. When 'handleTogglePlay' is invoked, we need to update both the 'video'
 *    player itself and our state which tracks whether the video is playing
 *    or not.
 * 
 *    To do this we'll first need to update 'isPlaying' to be a piece of
 *    React state using useState.
 * 
 *    const [isPlaying, setIsPlaying] = useState(false);
 * 
 *    And then inside of 'handleTogglePlay', we can update both our 'isPlaying'
 *    state as well as the video player.
 * 
 *    const handleTogglePlay = () => {
 *      if (videoRef.current) {
 *        if (isPlaying) {
 *          videoRef.current.pause();
 *        } else {
 *          videoRef.current.play();
 *        }
 *        setIsPlaying(!isPlaying);
 *      }
 *    };
 * 
*/

import './App.css'
import { useState, useRef } from 'react'

function VideoPlayer() {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTogglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="container">
      <h1>Video Player</h1>
      <article>
        <video ref={videoRef} poster="https://image.mux.com/TbVCJiOghmISJgg4AznPfFHYRfiVoek8OJHF56Y01oR4/thumbnail.webp">
          <source src="https://stream.mux.com/TbVCJiOghmISJgg4AznPfFHYRfiVoek8OJHF56Y01oR4/high.mp4" type="video/mp4" />
        </video>

        <div>
          <button title={isPlaying ? "Pause" : "Play"} onClick={handleTogglePlay}>
            {isPlaying ? "⏸" : "▶"}
          </button>
        </div>
      </article>
    </section>
  );
}


function App() {

  return (
    <div>
      <VideoPlayer />
    </div>
  )
}

export default App
