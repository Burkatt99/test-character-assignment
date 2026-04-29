import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ICharacter } from "@/types";

import CharacterProfile from "./index";

const mockCharacter = (overrides?: Partial<ICharacter>): ICharacter => ({
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  image: "https://example.com/rick.jpg",
  origin: { name: "Earth", url: "" },
  location: { name: "Citadel", url: "" },
  ...overrides,
});

const defaultProps = {
  character: null,
  isLoading: false,
  error: null,
};

describe("CharacterProfile", () => {
  it("should render avatar placeholder when no character", () => {
    render(<CharacterProfile {...defaultProps} />);

    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "/src/assets/avatar.png",
    );
  });

  it("should render loader when isLoading is true", () => {
    render(<CharacterProfile {...defaultProps} isLoading />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("should not render character info when isLoading", () => {
    render(
      <CharacterProfile
        {...defaultProps}
        character={mockCharacter()}
        isLoading
      />,
    );

    expect(screen.queryByText("Rick Sanchez")).not.toBeInTheDocument();
  });

  it("should render character info when character is provided", () => {
    render(<CharacterProfile {...defaultProps} character={mockCharacter()} />);

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Human")).toBeInTheDocument();
    expect(screen.getByText("Citadel")).toBeInTheDocument();
    expect(screen.getByText("Earth")).toBeInTheDocument();
    expect(screen.getByText("Alive")).toBeInTheDocument();
  });

  it("should render character image when character is provided", () => {
    render(<CharacterProfile {...defaultProps} character={mockCharacter()} />);

    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://example.com/rick.jpg",
    );
  });

  it("should render error message when error is provided", () => {
    render(<CharacterProfile {...defaultProps} error="Character not found" />);

    expect(screen.getByText("Character not found")).toBeInTheDocument();
  });

  it("should not render character info when error is provided", () => {
    render(
      <CharacterProfile
        {...defaultProps}
        character={mockCharacter()}
        error="Character not found"
      />,
    );

    expect(screen.queryByText("Rick Sanchez")).not.toBeInTheDocument();
  });

  it("should render Dead status", () => {
    render(
      <CharacterProfile
        {...defaultProps}
        character={mockCharacter({ status: "Dead" })}
      />,
    );

    expect(screen.getByText("Dead")).toBeInTheDocument();
  });

  it("should render unknown status", () => {
    render(
      <CharacterProfile
        {...defaultProps}
        character={mockCharacter({ status: "unknown" })}
      />,
    );

    expect(screen.getByText("unknown")).toBeInTheDocument();
  });
});
