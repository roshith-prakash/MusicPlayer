import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [displaySongs, setDisplaySongs] = useState();

  const { data: songs } = useQuery({
    queryKey: ["songs"],
    queryFn: () => {
      return axios.get("https://cms.samespace.com/items/songs");
    },
  });

  useEffect(() => {
    setDisplaySongs(songs?.data?.data);
  }, [songs]);

  return (
    <div>
      <div>
        {displaySongs &&
          displaySongs.map((song) => {
            return (
              <>
                <p className="my-3">
                  {song?.name} | {song?.artist}
                </p>
                <audio controls autoplay muted>
                  <source src={song?.url} type="audio/mp3" />
                </audio>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
