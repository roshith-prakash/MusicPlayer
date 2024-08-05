import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ListSong } from "../components";
import spotify from "../assets/logo.png";

import { BsThreeDots } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { FaForward } from "react-icons/fa";
import { FaBackward } from "react-icons/fa";
import { FaVolumeHigh } from "react-icons/fa6";

const Home = () => {
  const [displaySongs, setDisplaySongs] = useState();
  const [selectedSong, setSelectedSong] = useState();
  const [topSongs, setTopSongs] = useState();
  const [tab, setTab] = useState("ForYou");

  const { data: songs } = useQuery({
    queryKey: ["songs"],
    queryFn: () => {
      return axios.get("https://cms.samespace.com/items/songs");
    },
  });

  useEffect(() => {
    setDisplaySongs(songs?.data?.data);

    const top = songs?.data?.data?.filter((song) => song?.top_track == true);

    setTopSongs(top);
  }, [songs]);

  const setSong = (song) => {
    setSelectedSong(song);
  };

  console.log(displaySongs);

  return (
    <div className="h-screen max-h-screen overflow-hidden flex flex-col bg-black">
      {/* Top Bar */}
      <div className="h-20 flex items-center w-full p-5 px-10">
        {/* Logo + Title */}
        <div className="flex gap-x-3 items-center">
          <img src={spotify} className="h-9 w-9 pointer-events-none" />
          <p className="text-white font-medium text-2xl flex items-start">
            Spotify
            <span className="text-xs pt-2">&reg;</span>
          </p>
        </div>

        {/* Button Group */}
        <div className="text-white flex gap-x-14 px-10 font-semibold text-xl ml-20">
          <button
            onClick={() => setTab("ForYou")}
            className={`hover:scale-105 transition-all ${
              tab != "ForYou" && "text-slate-400"
            }`}
          >
            For You
          </button>
          <button
            onClick={() => setTab("TopTracks")}
            className={`hover:scale-105 transition-all ${
              tab != "TopTracks" && "text-slate-400"
            }`}
          >
            Top Tracks
          </button>
        </div>
      </div>

      {/* Rest of Screen - List + Player */}
      <div className="flex-1 pt-5">
        <div className="flex items-center">
          {/* List of All Songs / For You */}
          {tab == "ForYou" && (
            <div
              data-aos="fade-up"
              className={`flex-1 h-full flex flex-col items-center overflow-scroll no-scrollbar`}
            >
              {displaySongs &&
                displaySongs.map((song) => {
                  return <ListSong setSong={setSong} song={song} />;
                })}
            </div>
          )}

          {/* List of Top Songs */}
          {tab == "TopTracks" && (
            <div
              data-aos="fade-up"
              className="flex-1 h-full flex flex-col items-center overflow-scroll no-scrollbar"
            >
              {topSongs &&
                topSongs.map((song) => {
                  return <ListSong setSong={setSong} song={song} />;
                })}
            </div>
          )}

          {/* Music Player Div */}
          <div className="flex-1 flex justify-center text-white">
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

              <div className="flex justify-between">
                <p>a</p>
                <p>a</p>
                <p>a</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
