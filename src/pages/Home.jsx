import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { ListSong, MusicPlayer, Search } from "../components";
import spotify from "../assets/logo.png";
import useDebounce from "../hooks/useDebounce";

const Home = () => {
  const [displaySongs, setDisplaySongs] = useState();
  const [selectedSong, setSelectedSong] = useState();
  const [topSongs, setTopSongs] = useState();
  const [userInput, setUserInput] = useState("");
  const [tab, setTab] = useState("ForYou");
  const debouncedInput = useDebounce(userInput);

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
      let top = songs?.data?.data?.filter((song) => song?.top_track == true);
      setTopSongs(top);
    } else {
      // Filter the songs which have the user Input in the
      const inputBasedSongs = songs?.data?.data?.filter(
        (song) =>
          String(song?.name)
            .toLowerCase()
            .includes(String(debouncedInput.toLowerCase())) ||
          String(song?.artist)
            .toLowerCase()
            .includes(String(debouncedInput.toLowerCase()))
      );

      // Set the for you songs based on user input (debounced)
      setDisplaySongs(inputBasedSongs);

      // Filter top tracks based on user input (debounced)
      let top = inputBasedSongs?.filter((song) => song?.top_track == true);

      // Set top tracks that match the user's input
      setTopSongs(top);
    }
  }, [songs, debouncedInput]);

  // On clicking a song in the list, set the selected song as that song
  const setSong = (song) => {
    setSelectedSong(song);
  };

  // Back Button Function to go to previous song
  const selectPreviousSong = () => {
    let songsArray;

    // Populate SongsArray
    tab == "ForYou" ? (songsArray = displaySongs) : (songsArray = topSongs);

    // Find Index of current song
    const indexOfCurrentSong = songsArray.findIndex(
      (elem) => elem.id == selectedSong.id
    );

    // If current song is first song in array, move to the last song
    if (indexOfCurrentSong == 0) {
      setSelectedSong(songsArray[songsArray.length - 1]);
    }
    // Move to the previous song in the array
    else {
      setSelectedSong(songsArray[indexOfCurrentSong - 1]);
    }
  };

  // Forward Button Function to go to next song
  const selectNextSong = () => {
    let songsArray;

    // Populate SongsArray
    tab == "ForYou" ? (songsArray = displaySongs) : (songsArray = topSongs);

    // Find Index of current song
    const indexOfCurrentSong = songsArray.findIndex(
      (elem) => elem.id == selectedSong.id
    );

    // If current song is last song in array, move to the first song
    if (indexOfCurrentSong == songsArray.length - 1) {
      setSelectedSong(songsArray[0]);
    }
    // Move to the next song in the array
    else {
      setSelectedSong(songsArray[indexOfCurrentSong + 1]);
    }
  };

  return (
    <div className="min-h-screen overflow-clip flex flex-col bg-black">
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
        <div className="flex relative">
          <div className="h-full overflow-clip flex flex-1 flex-col items-center pl-20">
            {/* Search bar for filtering songs based on user input */}
            <Search
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />

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
              <MusicPlayer
                goToPrevious={selectPreviousSong}
                goToNext={selectNextSong}
                selectedSong={selectedSong}
              />
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
