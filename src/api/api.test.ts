import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { fetchCharacterById } from "./index";

const mockCharacter = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  image: "https://example.com/rick.jpg",
  origin: { name: "Earth", url: "" },
  location: { name: "Citadel", url: "" },
};

describe("fetchCharacterById", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should return character when response is ok", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockCharacter),
    } as Response);

    const character = await fetchCharacterById(1);

    expect(character).toEqual(mockCharacter);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/character/1"));
  });

  it("should throw error when response is not ok", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
    } as Response);

    await expect(fetchCharacterById(999)).rejects.toThrow(
      "Character not found",
    );
  });

  it("should throw error when network fails", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("Network error"));

    await expect(fetchCharacterById(1)).rejects.toThrow("Network error");
  });
});
