/**
 * Challenge: News Feed
 * In this challenge, you're given a news feed with different videos. To
 * improve the UX of your feed, the challenge is to make sure only one video
 * can plat at a time.
 * 
 * Specifically, you'll probably want to tackle the following steps:
 * 1. Finish the NewsFeed component by rendering a VideItem component for
 *    every video in the videos array.
 * 2. Finish the VideoPlaybackProvider component so that playingVideoId and
 *    setPlayingVideoId are available throughout the component tree.
 * 3. Finish VideoItem so that the user can play and pause a video, but that
 *    they do, any other video that is currently playing is paused.
 * 
 * In my opinion this is the hardest challenge we've had throughout the
 * course so far, so keep that is mind as you wrestle with imposter
 * syndrome and self-doubt. 
 * 
 * Tasks:
 * 1. Allow only one video to play at a time.
 * 
 * Hint:
 * 1. A little throwback to the fundamentals. Use JS's map method to render
 *    a VideoItem component for every video in the videos array.
 * 
 *    <ul>
 *       {videos.map((video) => (
 *         <VideoItem
 *           key={video.id}
 *           videoId={video.id}
 *           title={video.title}
 *           poster={video.poster}
 *           src={video.src}
 *         />
 *       ))}
 *    </ul>
 * 
 * 2. For those in the back, context is a way to transport data, not a state
 *    manager. Because we want our app to re-render whenever the status of
 *    a video player changes, we'll stick and them make it available via our
 *    context.
 * 
 *    function VideoPlaybackProvider({ children }) {
 *       const [playingVideoId, setPlayingVideoId] = useState(null);
 *
 *       return (
 *         <videoPlaybackContext.Provider value={{ playingVideoId, setPlayingVideoId }}>
 *           {children}
 *         </videoPlaybackContext.Provider>
 *       );
 *      }
 * 
 * 3. When the play/pause button is clicked, VideoItem needs to do two
 *    things - 
 *    a. Update the playingVideoId state that's on context(so the play/pause
 *       button renders correctly) and 
 *    b. play or pause the video element.
 * 
 *    This hint will be for updating playingVideoId, and the next one will be
 *    for playing/pausing the video element.
 * 
 *    First, we let's grab our two values from context.
 * 
 *    function VideoItem({ videoId, title, poster, src }) {
 *       const { playingVideoId, setPlayingVideoId } = useContext(videoPlaybackContext);
 *         ...
 *    }
 * 
 *    Now we need to update videoIsActive. The logic here is pretty straight
 *    forward and it all depends on if the video that was clicked is currently
 *    playing or not.
 * 
 *    If it is, we want to set videoIsActive to true. If it isn't, we'll
 *    set it to 'false'. 
 * 
 *    function VideoItem({ videoId, title, poster, src }) {
 *       const { playingVideoId, setPlayingVideoId } = useContext(videoPlaybackContext);
 *
 *       const videoIsActive = playingVideoId === videoId;
 *     }
 * 
 *    Now we can use videoIsActive to update our handleTogglePlay event
 *    handler(which updates our playingVideoId state on context).
 * 
 *    If videoIsActive is falsy, we'll set playingVideoId to the videoId
 *    that was clicked. If it's truthy, we'll set playingVideoId to null
 *    (representing that no video is playing since the one that has been
 *    paused).
 * 
 *    const handleTogglePlay = () => {
 *       if (!videoIsActive) {
 *          setPlayingVideoId(videoId);
 *       } else {
 *          setPlayingVideoId(null);
 *       }
 *    };
 * 
 * 4. In order to play/pause the video element, we'll first need to grab
 *    a reference to it. We can do that by creating a ref and attaching it
 *    to the video element.
 * 
 *    function VideoItem({ videoId, title, poster, src }) {
 *       const videoRef = useRef(null);
 *       const { playingVideoId, setPlayingVideoId } = useContext(videoPlaybackContext);
 *
 *       const videoIsActive = playingVideoId === videoId;
 *
 *       const handleTogglePlay = () => {
 *         if (!videoIsActive) {
 *           setPlayingVideoId(videoId);
 *         } else {
 *           setPlayingVideoId(null);
 *         }
 *       };
 *      
 *       return (
 *         <li>
 *           <h3>{title}</h3>
 *           <article>
 *             <video ref={videoRef} poster={poster}>
 *               <source src={src} type="video/mp4" />
 *             </video>
 *             <button
 *               title={videoIsActive ? "Pause" : "Play"}
 *               onClick={handleTogglePlay}
 *             >
 *               {videoIsActive ? "⏸" : "▶"}
 *             </button>
 *           </article>
 *         </li>
 *       );
 *      }
 *     
 *  Now we all need to do is synchronize the video element with our videIsActive
 *  state. If videoIsActive changes and truthy, we want to play the video.
 *  If not, we want to pause it.
 * 
 *  This is the perfect use case for useEffect.
 * 
 *  useEffect(() => {
 *    if (videoIsActive) {
 *      videoRef.current.play();
 *    } else {
 *      videoRef.current.pause();
 *    }
 *   }, [videoIsActive]);
*/

import './App.css'

const videoPlaybackContext = createContext({
  videoPlayingId: null,
  setPlayingVideoId: () => { }
});

function VideoPlaybackProvider({ children }) {
  const [playingVideoId, setPlayingVideoId] = useState(null);

  return (
    <videoPlaybackContext.Provider
      value={{ playingVideoId, setPlayingVideoId }}
    >
      {children}
    </videoPlaybackContext.Provider>
  );
}

function VideoItem({ videoId, title, poster, src }) {
  const videoRef = useRef(null);
  const { playingVideoId, setPlayingVideoId } = useContext(
    videoPlaybackContext
  );

  const videoIsActive = playingVideoId === videoId;

  const handleTogglePlay = () => {
    if (!videoIsActive) {
      setPlayingVideoId(videoId);
    } else {
      setPlayingVideoId(null);
    }
  };

  useEffect(() => {
    if (videoIsActive) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [videoIsActive]);

  return (
    <li>
      <h3>{title}</h3>
      <article>
        <video ref={videoRef} poster={poster}>
          <source src={src} type="video/mp4" />
        </video>
        <button
          title={videoIsActive ? "Pause" : "Play"}
          onClick={handleTogglePlay}
        >
          {videoIsActive ? "⏸" : "▶"}
        </button>
      </article>
    </li>
  );
}

function NewsFeed() {
  const videos = [
    {
      id: 1,
      title: "The React Way",
      poster: "https://gg/img/visualized-og2.jpg",
      src:
        "https://stream.mux.com/TbVCJiOghmISJgg4AznPfFHYRfiVoek8OJHF56Y01oR4/high.mp4"
    },
    {
      id: 2,
      title: "The History of the Web",
      poster: "https://gg/img/visualized-og1.jpg",
      src:
        "https://stream.mux.com/EwJPlEBa0046jGSVdYOnRsX9WnqHjytgIBXwkOt7LvVg/high.mp4"
    },
    {
      id: 3,
      title: "Rendering, Visualized",
      poster: "https://gg/img/visualized-og5.jpg",
      src:
        "https://stream.mux.com/VvQKMwPEOq5BUnc9eRN4sL5sUEZrHqWxNlCbpXSkE3I/high.mp4"
    }
  ];

  return (
    <div>
      <h1>News Feed</h1>
      <ul>
        {videos.map((video) => (
          <VideoItem
            key={video.id}
            videoId={video.id}
            title={video.title}
            poster={video.poster}
            src={video.src}
          />
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <VideoPlaybackProvider>
      <NewsFeed />
    </VideoPlaybackProvider>
  );
}

export default App
