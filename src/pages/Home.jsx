import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { ListSong, MusicPlayer, Search } from "../components";
import spotify from "../assets/logo.png";

const Home = () => {
  const [displaySongs, setDisplaySongs] = useState();
  const [selectedSong, setSelectedSong] = useState();
  const [topSongs, setTopSongs] = useState();
  const [userInput, setUserInput] = useState("");
  const [tab, setTab] = useState("ForYou");

  // Fetching data from API
  const {
    data: songs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["songs"],
    queryFn: () => {
      return axios.get("https://cms.samespace.com/items/songs");
    },
  });

  // When data is fetched from API, set the for you songs & the top songs
  useEffect(() => {
    setDisplaySongs(songs?.data?.data);
    const top = songs?.data?.data?.filter((song) => song?.top_track == true);
    setTopSongs(top);
  }, [songs]);

  // When user types something in the list
  useEffect(() => {
    // When no user input, reset the list
    if (!userInput || userInput?.length == 0) {
      setDisplaySongs(songs?.data?.data);
      const top = songs?.data?.data?.filter((song) =>
        String(song?.top_track)
          .toLowerCase()
          .includes(String(userInput.toLowerCase()))
      );
      setTopSongs(top);
    } else {
      let inputBasedSongs = songs?.data?.data?.filter(
        (song) => song?.top_track == true
      );
    }
  }, [songs, userInput]);

  // On clicking a song in the list, set the selected song as that song
  const setSong = (song) => {
    setSelectedSong(song);
  };

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
        <div className="flex">
          <div className="hidden lg:flex flex-1 flex-col items-center pl-20">
            <Search />
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
          </div>

          {/* Music Player Div */}
          <div className="flex-1 flex justify-center text-white">
            {selectedSong ? (
              <MusicPlayer selectedSong={selectedSong} />
            ) : (
              <div className="w-[60%]">
                <img src={spotify} className="max-w-80 mx-auto" />
                <p className="mt-5 text-xl text-center">
                  Click on a Song to start playing!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
