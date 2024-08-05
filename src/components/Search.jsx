import { CiSearch } from "react-icons/ci";

const Search = ({
  value,
  onChange,
  className,
  placeholder = "Search Song, Artist",
}) => {
  return (
    <div className="relative w-80">
      <input
        value={value}
        onChange={onChange}
        type="text"
        placeholder={placeholder}
        className={`w-full py-2 px-4 bg-gradient-to-r pr-10 from-[#383838] to-[#2e2e2e] text-white outline-none placeholder:text-white rounded ${className}`}
      />
      <CiSearch className="absolute right-4 text-white top-2.5 text-xl" />
    </div>
  );
};

export default Search;
