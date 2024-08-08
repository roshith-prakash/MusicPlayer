// Loader component when songs havent been fetched

const ListLoader = ({ song, onClick }) => {
  return (
    <div className="w-80 hover:-translate-y-2 py-5 transition-all flex">
      <div className="w-full flex items-center justify-between gap-x-5">
        <div className="flex items-center gap-x-5">
          {/* Cover image of the song */}
          <div className={`h-12 w-12 rounded-full bg-gray-500 animate-pulse`} />
          {/* Song title + artist name */}
          <div className="flex flex-col gap-y-2">
            <p className="text-transparent rounded bg-gray-500 animate-pulse text-lg text-left">
              ABCXYZABCXYZ
            </p>
            <p className="text-transparent rounded bg-gray-500 animate-pulse text-sm text-left">
              ABCXYZABCXYZ
            </p>
          </div>
        </div>
        {/* Length of the song */}
        <p className="text-transparent bg-gray-500 rounded animate-pulse text-base">
          {/* If audiolength is not undefined */}
          {/* Get the minute length by dividing by 60 & remaining seconds by using mod 60 */}
          00:00
        </p>
      </div>
    </div>
  );
};

export default ListLoader;
