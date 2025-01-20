// Loader component when songs havent been fetched
const ListLoader = () => {
  return (
    <div className="font-inter w-80 hover:-translate-y-2 py-5 transition-all flex">
      <div className="w-full flex items-center justify-between gap-x-5">
        <div className="flex items-center gap-x-5">
          {/* Cover image of the song - greyed out */}
          <div className={`h-12 w-12 rounded-full bg-gray-500 animate-pulse`} />
          {/* Song title + artist name - greyed out */}
          <div className="flex flex-col gap-y-2">
            <p className="text-transparent rounded h-5 w-32 bg-gray-500 animate-pulse text-lg text-left"></p>
            <p className="text-transparent rounded h-5 w-32 bg-gray-500 animate-pulse text-sm text-left"></p>
          </div>
        </div>
        {/* Length of the song - greyed out */}
        <p className="text-transparent h-5 w-10 bg-gray-500 rounded animate-pulse text-base"></p>
      </div>
    </div>
  );
};

export default ListLoader;
