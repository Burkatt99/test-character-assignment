import styled from "styled-components";

import Button from "../Button";

export const ListContainer = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const ImgBox = styled.div<{
  $isSelected: boolean;
}>`
  padding: 2px;
  border-radius: 16px;
  border: 2px solid transparent;
  position: relative;

  ${({ $isSelected }) =>
    $isSelected && "border: 2px solid var(--border-accent);"}

  &:hover {
    border: 2px solid var(--border-accent);
    cursor: pointer;
  }
`;

export const MiniAvatar = styled.img<{
  $isSelected: boolean;
}>`
  width: 80px;
  height: 80px;
  border-radius: 16px;
  display: block;
  opacity: ${({ $isSelected }) => ($isSelected ? "1" : "0.4")};

  @media (min-width: 1920px) {
    width: 160px;
    height: 160px;
  }
`;

export const CloseButton = styled(Button)`
  position: absolute;
  right: -8px;
  top: -8px;
`;
