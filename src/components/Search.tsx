import { ChangeEventHandler } from "react";
import { CiSearch } from "react-icons/ci";

// Stylized search component
const Search = ({
  value,
  onChange,
  className,
  placeholder = "Search Song, Artist",
}: {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  placeholder?: string;
}) => {
  return (
    // Relative parent so that search icon can be placed on the right
    <div className="font-inter relative z-2 w-80">
      <input
        value={value}
        onChange={onChange}
        type="text"
        placeholder={placeholder}
        className={`w-full text-base z-0 py-2 px-4 bg-gradient-to-r pr-10 from-[#383838] to-[#2e2e2e] text-white outline-none placeholder:text-slate-300 rounded ${className}`}
      />
      {/* Search icon on the right - absolutely positioned */}
      <CiSearch className="absolute right-4 text-slate-300 top-2.5 text-xl" />
    </div>
  );
};

export default Search;
