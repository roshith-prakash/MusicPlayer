import { useEffect, useState } from "react";

const ListSong = ({ song, onClick }) => {
  // To store the length of the song in seconds
  const [audioLength, setAudioLength] = useState();

  // To get the length of the song
  const getLength = (url) => {
    // Create a new audio object
    const audio = new Audio(url);
    // When song is loaded, get the duration and set it in the state
    audio.addEventListener("loadedmetadata", () => {
      setAudioLength(audio.duration);
    });
  };

  useEffect(() => {
    getLength(song?.url);
  }, [song?.name]);

  return (
    <div
      onClick={onClick}
      className="w-80 cursor-pointer hover:-translate-y-1 py-5 transition-all flex"
    >
      <div className="w-full flex items-center justify-between gap-x-5">
        <div className="flex items-center gap-x-5">
          {/* Cover image of the song */}
          <img
            className="h-12 w-12 rounded-full"
            src={`https://cms.samespace.com/assets/${song?.cover}`}
          />
          {/* Song title + artist name */}
          <div>
            <p className="text-white text-lg text-left">{song?.name}</p>
            <p className="text-slate-300 text-sm text-left">{song?.artist}</p>
          </div>
        </div>
        {/* Length of the song */}
        <p className="text-white">
          {/* If audiolength is not undefined */}
          {/* Get the minute length by dividing by 60 & remaining seconds by using mod 60 */}
          {audioLength
            ? Math.round(audioLength / 60) + ":" + Math.round(audioLength % 60)
            : ""}
        </p>
      </div>
    </div>
  );
};

export default ListSong;
