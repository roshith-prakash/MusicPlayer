import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ListSong, MusicPlayer, Search, Account } from "../components";
import spotify from "../assets/logo.png";
import useDebounce from "../hooks/useDebounce";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import ColorThief from "colorthief";

const Home = () => {
  const [displaySongs, setDisplaySongs] = useState();
  const [selectedSong, setSelectedSong] = useState();
  const [topSongs, setTopSongs] = useState();
  const [userInput, setUserInput] = useState("");
  const [tab, setTab] = useState("ForYou");
  const [open, setOpen] = useState(false);
  const debouncedInput = useDebounce(userInput);
  const backgroundRef = useRef();

  const [color1, setColor1] = useState([36, 33, 29]);

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

  // To change background color based on song
  useEffect(() => {
    // Run only when a song is selected
    if (selectedSong) {
      // Create a new color thief instance
      const colorThief = new ColorThief();
      // Create a new image object.
      const image = new Image();
      // Add the image source
      image.src = `https://cms.samespace.com/assets/${selectedSong?.cover}`;
      // Add cross origin anonymous so that color thief can work
      image.crossOrigin = "anonymous";
      // Add event listener for getting color when image loads
      image.addEventListener("load", () => {
        setColor1(colorThief.getColor(image));
      });
    }
  }, [selectedSong?.id]);

  return (
    <div
      className="h-screen relative overflow-hidden transiton-all box"
      ref={backgroundRef}
      style={{
        transition: "background 4s ease",
        background: `linear-gradient(to bottom right, rgb(${color1[0]},${color1[1]},${color1[2]}), black)`,
      }}
    >
      <div className="absolute left-5 bottom-5">
        <Account />
      </div>

      {/* Top Bar */}
      <div className="h-20 flex justify-between lg:justify-normal items-center w-full p-5 px-10">
        {/* Logo + Title */}
        <div className="flex gap-x-3 items-center">
          <img src={spotify} className="h-9 w-9 pointer-events-none" />
          <p className="text-white font-medium text-2xl flex items-start">
            Spotify
            <span className="text-xs pt-2">&reg;</span>
          </p>
        </div>

        {/* Button Group for Larger Screens */}
        <div className="text-white hidden lg:flex gap-x-14 px-10 font-semibold text-xl ml-20">
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

        <RxHamburgerMenu
          onClick={() => setOpen(true)}
          className="md:hidden text-xl cursor-pointer text-cta transition-all text-white"
        />

        {/* Pop out div - displayed when hamburger is clicked  */}
        <div
          className={`block lg:hidden bg-black h-screen w-full text-xl md:text-lg fixed top-0 right-0 z-50 pb-6 text-center shadow-md ${
            open ? "translate-x-0" : "translate-x-[100%]"
          } transition-all duration-500`}
        >
          {/* Top bar */}
          <div className="flex justify-between items-center py-5 px-10 lg:px-10 mb-14">
            {/* Title */}
            <div className="flex items-center gap-x-3 cursor-pointer">
              <img src={spotify} className="h-9 w-9 pointer-events-none" />
              <p className="text-white font-medium text-2xl flex items-start">
                Spotify
                <span className="text-xs pt-2">&reg;</span>
              </p>
            </div>
            {/* Close drawer */}
            <RxCross2
              onClick={() => setOpen(false)}
              className="cursor-pointer text-2xl text-white"
            />
          </div>
          {/* Song list + search box */}
          <div className="mt-14 h-full flex flex-col items-center">
            <div className="h-full flex-1 flex-col items-center">
              {/* Search bar for filtering songs based on user input */}
              <Search
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />

              {/* List of All Songs / For You */}
              {tab == "ForYou" && (
                <div
                  data-aos="fade-up"
                  className={`flex-1 pt-10 h-full flex flex-col items-center overflow-scroll no-scrollbar`}
                >
                  {displaySongs &&
                    displaySongs.map((song) => {
                      return (
                        <ListSong
                          onClick={() => {
                            setSong(song);
                            setOpen(false);
                          }}
                          song={song}
                        />
                      );
                    })}
                </div>
              )}

              {/* List of Top Songs */}
              {tab == "TopTracks" && (
                <div
                  data-aos="fade-up"
                  className="flex-1 pt-10 h-full flex flex-col items-center overflow-scroll no-scrollbar"
                >
                  {topSongs &&
                    topSongs.map((song) => {
                      return (
                        <ListSong
                          onClick={() => {
                            setSong(song);
                            setOpen(false);
                          }}
                          song={song}
                        />
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Rest of Screen - List + Player */}
      <div className="h-full pt-5">
        <div className="flex">
          {/* Song List - Hidden on Smaller Screens */}
          <div className="h-full flex-1 hidden lg:flex flex-col items-end mr-64 ">
            {/* Search bar for filtering songs based on user input */}
            <Search
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            {/* List of All Songs / For You */}
            {tab == "ForYou" && (
              <div
                data-aos="fade-up"
                className={`flex-1 pt-5 h-full flex flex-col items-center overflow-scroll no-scrollbar`}
              >
                {displaySongs &&
                  displaySongs.map((song) => {
                    return (
                      <ListSong onClick={() => setSong(song)} song={song} />
                    );
                  })}
              </div>
            )}
            {/* List of Top Songs */}
            {tab == "TopTracks" && (
              <div
                data-aos="fade-up"
                className="flex-1 pt-5 h-full flex flex-col items-center overflow-scroll no-scrollbar"
              >
                {topSongs &&
                  topSongs.map((song) => {
                    return (
                      <ListSong onClick={() => setSong(song)} song={song} />
                    );
                  })}
              </div>
            )}
          </div>

          {/* Music Player Div */}
          <div className="flex-1 flex justify-center lg:justify-start text-white">
            {selectedSong ? (
              <MusicPlayer
                goToPrevious={selectPreviousSong}
                goToNext={selectNextSong}
                selectedSong={selectedSong}
              />
            ) : (
              // Position Holder when no song is selected
              <div className="w-[60%] relative h-[60vh] lg:h-full flex flex-col justify-center lg:justify-start ">
                <img src={spotify} className="w-[80%] max-w-80 mx-auto" />
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
