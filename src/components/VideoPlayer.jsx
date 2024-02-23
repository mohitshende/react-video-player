const VideoPlayer = ({ videoRef, src, autoplay, onEnded }) => {
  return (
    <video
      ref={videoRef}
      src={src}
      controls
      autoPlay={autoplay}
      onEnded={onEnded}
      className="w-64 h-48"
    />
  );
};

export default VideoPlayer;
