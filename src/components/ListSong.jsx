import { useEffect, useState } from "react";

const ListSong = ({ song, onClick, selectedSong }) => {
  // To store the length of the song in seconds
  const [audioLength, setAudioLength] = useState();
  // To check if cover is loading
  const [loading, setLoading] = useState(true);

  // To get the length of the song
  const getLength = (url) => {
    // Create a new audio object
    const audio = new Audio(url);
    // When song is loaded, get the duration and set it in the state
    audio.addEventListener("loadedmetadata", () => {
      setAudioLength(audio.duration);
    });
  };

  // Get length of the song
  useEffect(() => {
    getLength(song?.url);
  }, [song?.id]);

  return (
    // On clicking the component - set Selected song as the current song
    <div
      onClick={onClick}
      className={`font-inter w-[22rem] cursor-pointer hover:-translate-y-2 py-5 px-5 rounded-xl transition-all flex ${
        selectedSong?.id == song?.id && "bg-white bg-opacity-10"
      }`}
    >
      <div className="w-full flex items-center justify-between gap-x-5">
        <div className="flex items-center gap-x-5">
          {/* Cover image of the song */}
          <img
            onLoad={() => setLoading(false)}
            className={`h-12 w-12 rounded-full bg-gray-500 ${
              loading && "animate-pulse"
            }`}
            src={`https://cms.samespace.com/assets/${song?.cover}`}
          />
          {/* Song title + artist name */}
          <div>
            <p className="text-white text-lg text-left">{song?.name}</p>
            <p className="text-slate-300 text-sm text-left">{song?.artist}</p>
          </div>
        </div>
        {/* Length of the song */}
        {audioLength && (
          <p className={`${"text-white text-base"}`}>
            {/* If audiolength is not undefined */}
            {/* Get the minute length by dividing by 60 & remaining seconds by using mod 60 */}
            {audioLength &&
              Math.round(audioLength / 60) + ":" + Math.round(audioLength % 60)}
          </p>
        )}

        {!audioLength && (
          <p className="h-5 w-10 rounded bg-gray-500 animate-pulse"></p>
        )}
      </div>
    </div>
  );
};

export default ListSong;
