import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { fetchCharacterById } from "@/api";
import { ICharacter } from "@/types";

import CharacterSearching from ".";

vi.mock("@/api", () => ({
  fetchCharacterById: vi.fn(),
}));

vi.mock("@/hooks/useCharacterCache", () => ({
  useCharacterCache: vi.fn(() => ({
    cachedCharacters: [],
    getFromCache: vi.fn(() => null),
    addToCache: vi.fn(),
    removeFromCache: vi.fn(),
    clearCache: vi.fn(),
  })),
}));

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

describe("CharacterSearching", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render search input and button", () => {
    render(<CharacterSearching />);

    expect(
      screen.getByPlaceholderText(/enter any number/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("should disable search button when input is empty", () => {
    render(<CharacterSearching />);

    expect(screen.getByRole("button", { name: /search/i })).toBeDisabled();
  });

  it("should fetch character by id on search", async () => {
    const character = mockCharacter(1);

    vi.mocked(fetchCharacterById).mockResolvedValue(character);

    render(<CharacterSearching />);

    fireEvent.change(screen.getByPlaceholderText(/enter any number/i), {
      target: { value: "1" },
    });

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(fetchCharacterById).toHaveBeenCalledWith(1);
    });
  });

  it("should display character after successful fetch", async () => {
    const character = mockCharacter(1);

    vi.mocked(fetchCharacterById).mockResolvedValue(character);

    render(<CharacterSearching />);

    fireEvent.change(screen.getByPlaceholderText(/enter any number/i), {
      target: { value: "1" },
    });

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText("Beth Smith")).toBeInTheDocument();
    });
  });

  it("should display error when character not found", async () => {
    vi.mocked(fetchCharacterById).mockRejectedValue(
      new Error("Character not found"),
    );

    render(<CharacterSearching />);

    fireEvent.change(screen.getByPlaceholderText(/enter any number/i), {
      target: { value: "999" },
    });

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText("Character not found")).toBeInTheDocument();
    });
  });

  it("should load character from cache without fetching", async () => {
    const character = mockCharacter(1);
    const { useCharacterCache } = await import("@/hooks/useCharacterCache");

    vi.mocked(useCharacterCache).mockReturnValue({
      cachedCharacters: [character],
      getFromCache: vi.fn(() => character),
      addToCache: vi.fn(),
      removeFromCache: vi.fn(),
      clearCache: vi.fn(),
    });

    render(<CharacterSearching />);

    fireEvent.change(screen.getByPlaceholderText(/enter any number/i), {
      target: { value: "1" },
    });

    expect(fetchCharacterById).not.toHaveBeenCalled();
    expect(screen.getByText("Beth Smith")).toBeInTheDocument();
  });

  it("should keep character on screen when input is cleared", async () => {
    const character = mockCharacter(1);

    vi.mocked(fetchCharacterById).mockResolvedValue(character);

    render(<CharacterSearching />);

    fireEvent.change(screen.getByPlaceholderText(/enter any number/i), {
      target: { value: "1" },
    });

    fireEvent.click(screen.getByRole("button", { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText("Beth Smith")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText(/enter any number/i), {
      target: { value: "" },
    });

    expect(screen.getByText("Beth Smith")).toBeInTheDocument();
  });
});
