import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { FaForward } from "react-icons/fa";
import { FaBackward } from "react-icons/fa";
import { FaVolumeHigh } from "react-icons/fa6";

const MusicPlayer = ({ selectedSong }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="flex w-[60%] flex-col gap-y-5">
      <div>
        <p className="text-xl font-medium">{selectedSong?.name}</p>
        <p className="text-sm text-slate-300">{selectedSong?.artist}</p>
      </div>
      <img
        className="w-full h-96 rounded"
        src={`https://cms.samespace.com/assets/${selectedSong?.cover}`}
      />

      <input type="range" className="accent-white" />

      <div className="flex items-center justify-between">
        <button className="bg-gray-800 p-3 rounded-full">
          <BsThreeDots className="text-white text-lg" />
        </button>
        <div className="flex items-center gap-x-2">
          <button className="bg-gray-800 p-3 rounded-full">
            <FaBackward className="text-white text-lg" />
          </button>
          {playing ? (
            <button
              onClick={() => setPlaying(false)}
              className="bg-gray-800 p-3 rounded-full"
            >
              <FaPause className="text-white text-lg" />
            </button>
          ) : (
            <button
              onClick={() => setPlaying(true)}
              className="bg-gray-800 p-3 rounded-full"
            >
              <FaPlay className="text-white text-lg" />
            </button>
          )}
          <button className="bg-gray-800 p-3 rounded-full">
            <FaForward className="text-white text-lg" />
          </button>
        </div>
        <button className="bg-gray-800 p-3 rounded-full">
          <FaVolumeHigh className="text-white text-lg" />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
