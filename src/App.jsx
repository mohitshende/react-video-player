import { useState, useRef } from "react";
import Playlist from "./components/Playlist";
import VideoPlayer from "./components/VideoPlayer";

const videos = [
  {
    description:
      "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",

    subtitle: "By Blender Foundation",
    thumb: "images/BigBuckBunny.jpg",
    title: "Big Buck Bunny",
  },
  {
    description: "The first Blender Open Movie from 2006",
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    subtitle: "By Blender Foundation",
    thumb: "images/ElephantsDream.jpg",
    title: "Elephant Dream",
  },
  {
    description:
      "HBO GO now works with Chromecast -- the easiest way to enjoy online video on your TV. For when you want to settle into your Iron Throne to watch the latest episodes. For $35.\nLearn how to use Chromecast with HBO GO and more at google.com/chromecast.",
    url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    subtitle: "By Google",
    thumb: "images/ForBiggerBlazes.jpg",
    title: "For Bigger Blazes",
  },
];

const App = () => {
  const [playlist, setPlaylist] = useState(videos);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);

  const playNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const handleVideoClick = (videoIndex) => {
    setCurrentVideoIndex(videoIndex);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <VideoPlayer
          videoRef={videoRef}
          src={playlist[currentVideoIndex].url}
          autoplay={true}
          onEnded={playNextVideo}
        />
        <Playlist
          videos={playlist}
          currentVideoIndex={currentVideoIndex}
          onVideoClick={handleVideoClick}
          onVideoDragEnd={(result) => {
            console.log(result);
            if (!result.destination) return;
            const newPlaylist = Array.from(playlist);
            const [reorderedVideo] = newPlaylist.splice(result.source.index, 1);
            newPlaylist.splice(result.destination.index, 0, reorderedVideo);
            setPlaylist(newPlaylist);
          }}
        />
      </div>
    </div>
  );
};

export default App;
