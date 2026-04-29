import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ICharacter } from "@/types";

import CacheList from "./index";

const mockCharacter = (id: number): ICharacter => ({
  id,
  name: "Beth Smith",
  status: "Alive",
  species: "Human",
  type: "Pripudlian",
  image: `https://example.com/${id}.jpg`,
  origin: { name: "Earth", url: "" },
  location: { name: "Earth", url: "" },
});

const defaultProps = {
  characters: [],
  selectedId: null,
  onSelect: vi.fn(),
  onRemove: vi.fn(),
  onClearAll: vi.fn(),
};

describe("CacheList", () => {
  it("should not render clear button when cache is empty", () => {
    render(<CacheList {...defaultProps} />);

    expect(screen.queryByText(/clear all/i)).not.toBeInTheDocument();
  });

  it("should render clear button when cache has characters", () => {
    render(<CacheList {...defaultProps} characters={[mockCharacter(1)]} />);

    expect(screen.getByText(/clear all/i)).toBeInTheDocument();
  });

  it("should render all cached characters", () => {
    const characters = [mockCharacter(1), mockCharacter(2), mockCharacter(3)];

    render(<CacheList {...defaultProps} characters={characters} />);

    expect(screen.getAllByRole("img")).toHaveLength(3);
  });

  it("should call onSelect when character image is clicked", () => {
    const onSelect = vi.fn();
    const character = mockCharacter(1);

    render(
      <CacheList
        {...defaultProps}
        characters={[character]}
        onSelect={onSelect}
      />,
    );

    fireEvent.click(screen.getByRole("img"));

    expect(onSelect).toHaveBeenCalledWith(character);
  });

  it("should call onRemove when close button is clicked", () => {
    const onRemove = vi.fn();

    render(
      <CacheList
        {...defaultProps}
        characters={[mockCharacter(1)]}
        onRemove={onRemove}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "" }));

    expect(onRemove).toHaveBeenCalledWith(1);
  });

  it("should not call onSelect when closeButton is clicked", () => {
    const onSelect = vi.fn();

    render(
      <CacheList
        {...defaultProps}
        characters={[mockCharacter(1)]}
        onSelect={onSelect}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "" }));

    expect(onSelect).not.toHaveBeenCalled();
  });

  it("should call onClearAll when clearAll button is clicked", () => {
    const onClearAll = vi.fn();

    render(
      <CacheList
        {...defaultProps}
        characters={[mockCharacter(1)]}
        onClearAll={onClearAll}
      />,
    );

    fireEvent.click(screen.getByText(/clear all/i));

    expect(onClearAll).toHaveBeenCalled();
  });

  it("should highlight selected character", () => {
    const characters = [mockCharacter(1), mockCharacter(2)];

    const { container } = render(
      <CacheList {...defaultProps} characters={characters} selectedId={1} />,
    );

    const images = container.querySelectorAll("img");

    expect(images[0]).toHaveStyle({ opacity: "1" });
    expect(images[1]).toHaveStyle({ opacity: "0.4" });
  });
});
