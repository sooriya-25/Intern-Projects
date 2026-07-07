import { Input } from "antd";

const { Search } = Input;

function SearchBar({ search , setSearch, setPage }) {
  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <Search
      placeholder="Search Movies..."
      enterButton="Search"
      size="large"
      defaultValue={search}
      onSearch={handleSearch}
    />
  );
}

export default SearchBar;