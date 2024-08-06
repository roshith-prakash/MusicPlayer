import { useState, useRef } from "react";
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
    <div className="flex w-[80%] lg:w-[60%] flex-col gap-y-5">
      {/* Song Title + artist name */}
      <div>
        <p className="text-xl font-medium">{selectedSong?.name}</p>
        <p className="text-sm text-slate-300">{selectedSong?.artist}</p>
      </div>
      {/* Song Cover Art */}
      <div className="h-96 flex justify-center items-center">
        <img
          className="w-full h-96 rounded object-cover"
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
      <input
        value={currentTime}
        min={0}
        onChange={changeValueBySeeker}
        max={duration}
        type="range"
        className="accent-white"
      />

      {/* Additional Controls */}
      <div className="flex items-center justify-between">
        {/* Controls for 3 dotted buttons - Added Download */}
        <Popover>
          <PopoverTrigger>
            <button className="bg-gray-800 p-3 rounded-full">
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
        <div className="flex items-center gap-x-2">
          <button
            onClick={() => {
              goToPrevious();
              setPlaying(true);
            }}
            className="bg-gray-800 p-3 rounded-full"
          >
            <FaBackward className="text-white text-lg" />
          </button>
          {playing ? (
            <button
              onClick={playOrPause}
              className="bg-gray-800 p-3 rounded-full"
            >
              <FaPause className="text-white text-lg" />
            </button>
          ) : (
            <button
              onClick={playOrPause}
              className="bg-gray-800 p-3 rounded-full"
            >
              <FaPlay className="text-white text-lg" />
            </button>
          )}
          <button
            onClick={() => {
              goToNext();
              setPlaying(true);
            }}
            className="bg-gray-800 p-3 rounded-full"
          >
            <FaForward className="text-white text-lg" />
          </button>
        </div>
        <Popover>
          <PopoverTrigger>
            <button className="bg-gray-800 p-3 rounded-full">
              <FaVolumeHigh className="text-white text-lg" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-fit border-none">
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
