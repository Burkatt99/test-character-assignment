import styled from "styled-components";

export const SearchWrapper = styled.div<{
  $isFocused: boolean;
}>`
  display: flex;
  justify-content: space-between;
  max-width: 225px;
  border-bottom: 2px solid var(--border);
  border-bottom: ${({ $isFocused }) =>
    $isFocused ? "2px solid var(--border-focus)" : "2px solid var(--border)"};

  @media (min-width: 1024px) {
    min-width: 325px;
  }

  @media (min-width: 1920px) {
    min-width: 525px;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-style: italic;
  padding-right: 4px;
`;
