import { useEffect, useState } from "react";

const ListSong = ({ song, setSong }) => {
  const [audioLength, setAudioLength] = useState();

  const getLength = (url) => {
    const audio = new Audio(url);
    audio.addEventListener("loadedmetadata", () => {
      console.log("Audio duration", audio.duration);
      setAudioLength(audio.duration);
    });
  };

  useEffect(() => {
    getLength(song?.url);
  }, [song?.name]);

  return (
    <div
      onClick={() => setSong(song)}
      className="w-80 hover:bg-slate-900 hover:scale-105 cursor-pointer transition-all p-5 flex"
    >
      <div className="w-full flex items-center justify-between gap-x-5">
        <div className="flex items-center gap-x-5">
          <img
            className="h-12 w-12 rounded-full"
            src={`https://cms.samespace.com/assets/${song?.cover}`}
          />
          <div>
            <p className="text-white text-lg">{song?.name}</p>
            <p className="text-slate-300 text-sm">{song?.artist}</p>
          </div>
        </div>
        <p className="text-white">
          {audioLength
            ? Math.round(audioLength / 60) + ":" + Math.round(audioLength % 60)
            : ""}
        </p>
      </div>
    </div>
  );
};

export default ListSong;
