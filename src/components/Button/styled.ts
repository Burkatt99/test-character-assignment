import styled from "styled-components";

export const CustomButton = styled.button<{
  $close?: boolean;
}>`
  all: unset;
  background-color: var(--primary);
  border: none;
  cursor: pointer;
  font-style: italic;
  color: var(--text-accent);
  padding: 2px 8px;
  border-radius: 4px;

  &:disabled {
    cursor: not-allowed;
    color: var(--text-secondary);
  }

  &:hover:not(:disabled) {
    background-color: var(--bg-accent);
  }

  ${({ $close }) =>
    $close &&
    `
    width: 20px;
    height: 20px;
    border-radius: 50%;
    padding: 3px;
    background-color: var(--button-bg);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: var(--text-secondary);

    &:hover:not(:disabled) {
      color: var(--text-accent);
      background-color: var(--button-bg);
    }
  `}
`;
