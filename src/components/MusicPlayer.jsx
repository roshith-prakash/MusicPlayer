import { useState, useRef, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa6";
import { FaForward } from "react-icons/fa";
import { FaBackward } from "react-icons/fa";
import { FaVolumeHigh } from "react-icons/fa6";
import { FaVolumeMute } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const MusicPlayer = ({ selectedSong, goToPrevious, goToNext }) => {
  // Reference to the audio element
  const playerRef = useRef();
  // State to check whether the song is playing or not
  const [playing, setPlaying] = useState(true);
  // For the max value of range
  const [duration, setDuration] = useState(0);
  // For the current value of range
  const [currentTime, setCurrentTime] = useState(0);
  // State For volume
  const [audioVolume, setAudioVolume] = useState(1.0);
  // To check if cover is loading
  const [loading, setLoading] = useState(true);

  // When song is changed, set playing to true
  useEffect(() => {
    setPlaying(true);
  }, [selectedSong?.id]);

  // To play or pause the song
  const playOrPause = () => {
    if (playing) {
      playerRef.current.pause();
      setPlaying(false);
    } else {
      playerRef.current.play();
      setPlaying(true);
    }
  };

  // To Auto update the seeker value when the audio is playing
  const updateSeekerWhenPlaying = () => {
    setDuration(playerRef.current.duration);
    setCurrentTime(playerRef.current.currentTime);

    // When the song is over, go to next song
    if (playerRef.current.currentTime == playerRef.current.duration) {
      setTimeout(() => {
        goToNext();
      }, 1000);
    }
  };

  // To  update the currentTime value by interacting with the seeker
  const changeValueBySeeker = (e) => {
    playerRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  // Control volume
  const changeVolume = (e) => {
    playerRef.current.volume = e.target.value;
    setAudioVolume(e.target.value);
  };

  return (
    <div className="flex w-[80%] lg:w-[65%] flex-col gap-y-5">
      {/* Song Title + artist name */}
      <div>
        {/* Title - extra large size */}
        <p className="text-4xl font-medium text-left -translate-x-1">
          {selectedSong?.name}
        </p>
        {/* Artist's name */}
        <p className="text-sm mt-0.5 text-slate-300">{selectedSong?.artist}</p>
      </div>

      {/* Song Cover Art */}
      <div className="h-96 flex justify-center items-center">
        <img
          onLoad={() => {
            setLoading(false);
          }}
          className={`w-full h-full rounded object-cover bg-gray-500 ${
            loading && "animate-pulse"
          }`}
          src={`https://cms.samespace.com/assets/${selectedSong?.cover}`}
        />
      </div>

      {/* Hidden audio tag */}
      <audio
        autoPlay
        ref={playerRef}
        src={selectedSong?.url}
        onTimeUpdate={updateSeekerWhenPlaying}
        className="hidden"
      />

      {/* Seek bar for the audio */}
      {/* Value added in style for custom css */}
      <input
        value={currentTime}
        min={0}
        onChange={changeValueBySeeker}
        max={duration}
        type="range"
        className="accent-white noThumb slider"
        style={{
          "--value": `${(currentTime / duration) * 100}%`,
        }}
      />

      {/* Additional Controls */}
      <div className="flex items-center justify-between">
        {/* Controls for 3 dotted buttons - Added Download */}
        <Popover>
          <PopoverTrigger>
            <button className="bg-bggrey p-3 rounded-full">
              <BsThreeDots className="text-white text-lg" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-fit rounded-xl my-2 bg-white text-black">
            <a
              href={selectedSong?.url}
              download={selectedSong?.name}
              target="_blank"
              rel="noreferrer"
            >
              Download
            </a>
          </PopoverContent>
        </Popover>

        {/* Backward + Play / Pause + Forward buttons */}
        <div className="flex items-center gap-x-2">
          {/* Backward button */}
          <button
            onClick={() => {
              goToPrevious();
              setPlaying(true);
            }}
            className="px-3 rounded-full text-[#9b9a98] hover:text-white transition-all"
          >
            <FaBackward className=" text-lg" />
          </button>

          {/* If playing, show pause button, else show playing button */}
          {playing ? (
            // Pause button
            <button
              onClick={playOrPause}
              className="bg-bggrey p-3 rounded-full"
            >
              <FaPause className="text-white text-lg" />
            </button>
          ) : (
            // Play button
            <button
              onClick={playOrPause}
              className="bg-bggrey p-3 rounded-full"
            >
              <FaPlay className="text-white text-lg" />
            </button>
          )}
          {/* Forward Button */}
          <button
            onClick={() => {
              goToNext();
              setPlaying(true);
            }}
            className="px-3 rounded-full text-[#9b9a98] hover:text-white transition-all"
          >
            <FaForward className="text-lg" />
          </button>
        </div>

        {/* Volume control button */}
        <Popover>
          {/* Button to open up pop up */}
          <PopoverTrigger>
            <button className="bg-bggrey p-3 rounded-full">
              {audioVolume == 0.0 ? (
                <FaVolumeMute className="text-white text-lg" />
              ) : (
                <FaVolumeHigh className="text-white text-lg" />
              )}
            </button>
          </PopoverTrigger>
          {/* Input range to decrease volume */}
          <PopoverContent className="w-fit py-3 px-5 bg-black border-none">
            {/* Max volume is 1.0. Min volume is 0.0 */}
            <input
              value={audioVolume}
              min={0.0}
              max={1.0}
              step={0.01}
              onChange={changeVolume}
              type="range"
              className="accent-white"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default MusicPlayer;
