import styled from "styled-components";

type TextProps = {
  $bold?: boolean;
  $title?: boolean;
  $style?: "primary" | "secondary" | "danger" | "accent" | "success";
};

export const CustomText = styled.p<TextProps>`
  font-size: ${({ $title }) => ($title ? "32px" : "16px")};
  font-weight: ${({ $bold, $title }) => ($bold || $title ? "700" : "400")};
  text-align: left;
  text-transform: capitalize;

  color: ${({ $style }) => {
    switch ($style) {
      case "primary":
        return "var(--text-primary)";
      case "secondary":
        return "var(--text-secondary)";
      case "danger":
        return "var(--text-danger)";
      case "accent":
        return "var(--text-accent)";
      case "success":
        return "var(--text-success)";
      default:
        return "var(--text-primary)";
    }
  }};

  @media (min-width: 1920px) {
    font-size: ${({ $title }) => ($title ? "64px" : "32px")};
  }
`;
