import styled from "styled-components";

export const Container = styled.div<{
  $isError: boolean;
}>`
  width: 100%;
  display: flex;
  align-items: ${({ $isError }) => ($isError ? "flex-start" : "center")};
  gap: 24px;
`;

export const Avatar = styled.img`
  width: 225px;
  height: 225px;
  border-radius: 8px;
  display: block;
  width: 100%;
  height: auto;

  @media (min-width: 1024px) {
    width: 325px;
    height: 325px;
  }

  @media (min-width: 1920px) {
    width: 525px;
    height: 525px;
  }
`;

export const AvatarLoader = styled.div`
  width: 225px;
  height: 225px;
  border-radius: 8px;
  background: var(--bg);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 1024px) {
    width: 325px;
    height: 325px;
  }

  @media (min-width: 1920px) {
    width: 525px;
    height: 525px;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  text-align: center;
`;

export const Info = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 8px;
  align-items: baseline;

  @media (min-width: 1920px) {
    grid-template-columns: 120px 1fr;
  }
`;
