import React, { useState } from "react";

import Button from "../Button";
import { SearchInput, SearchWrapper } from "./styled";

interface ISearchProps {
  value: string;
  isLoading: boolean;
  onSearch: () => void;
  onChange: (value: string) => void;
}

const Search = (props: ISearchProps) => {
  const { value, isLoading, onSearch, onChange } = props;
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <SearchWrapper $isFocused={isFocused}>
      <SearchInput
        type="text"
        placeholder="Enter any number"
        value={value}
        disabled={isLoading}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
      />

      <Button disabled={isLoading || !value} onClick={onSearch} text="Search" />
    </SearchWrapper>
  );
};

export default Search;
