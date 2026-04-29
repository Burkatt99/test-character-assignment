import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CACHE_TTL, CLEANUP_INTERVAL, MAX_CACHE_SIZE } from "@/constants";
import { ICharacter } from "@/types";

import { useCharacterCache } from "./useCharacterCache";

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

const mockClearSearch = vi.fn();
const renderCache = () =>
  renderHook(() => useCharacterCache({ clearSearch: mockClearSearch }));

describe("useCharacterCache", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
    mockClearSearch.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("addToCache", () => {
    it("should add character to cache", () => {
      const { result } = renderCache();

      act(() => {
        result.current.addToCache(mockCharacter(1));
      });

      expect(result.current.cachedCharacters).toHaveLength(1);
      expect(result.current.cachedCharacters[0].id).toBe(1);
    });

    it("should update cache in localStorage", () => {
      const { result } = renderCache();

      act(() => {
        result.current.addToCache(mockCharacter(1));
      });

      const stored = JSON.parse(localStorage.getItem("character_cache")!);

      expect(stored.cache[1]).toBeDefined();
    });

    it("should remove oldest character when cache exceeds MAX_CACHE_SIZE", () => {
      const { result } = renderCache();

      for (let i = 1; i <= MAX_CACHE_SIZE + 1; i++) {
        act(() => {
          result.current.addToCache(mockCharacter(i));
        });
      }

      expect(result.current.cachedCharacters).toHaveLength(MAX_CACHE_SIZE);
      expect(
        result.current.cachedCharacters.find((c) => c.id === 1),
      ).toBeUndefined();
    });
  });

  describe("getFromCache", () => {
    it("should return character if exists in cache", () => {
      const { result } = renderCache();

      act(() => {
        result.current.addToCache(mockCharacter(1));
      });

      const character = result.current.getFromCache(1);

      expect(character?.id).toBe(1);
    });

    it("should return null if character not in cache", () => {
      const { result } = renderCache();

      expect(result.current.getFromCache(99)).toBeNull();
    });

    it("should return null and remove entry if TTL expired", () => {
      const { result } = renderCache();

      act(() => {
        result.current.addToCache(mockCharacter(1));
      });

      act(() => {
        vi.advanceTimersByTime(CACHE_TTL + 1000);
      });

      const character = result.current.getFromCache(1);

      expect(character).toBeNull();
    });
  });

  describe("removeFromCache", () => {
    it("should remove character from cache", () => {
      const { result } = renderCache();

      act(() => {
        result.current.addToCache(mockCharacter(1));
        result.current.addToCache(mockCharacter(2));
      });

      act(() => {
        result.current.removeFromCache(1);
      });

      expect(result.current.cachedCharacters).toHaveLength(1);
      expect(result.current.cachedCharacters[0].id).toBe(2);
    });

    it("should update localStorage after removal", () => {
      const { result } = renderCache();

      act(() => {
        result.current.addToCache(mockCharacter(1));
        result.current.removeFromCache(1);
      });

      const stored = JSON.parse(localStorage.getItem("character_cache")!);

      expect(stored.cache[1]).toBeUndefined();
    });
  });

  describe("clearCache", () => {
    it("should clear all characters from cache", () => {
      const { result } = renderCache();

      act(() => {
        result.current.addToCache(mockCharacter(1));
        result.current.addToCache(mockCharacter(2));
        result.current.clearCache();
      });

      expect(result.current.cachedCharacters).toHaveLength(0);
    });

    it("should remove cache from localStorage", () => {
      const { result } = renderCache();

      act(() => {
        result.current.addToCache(mockCharacter(1));
        result.current.clearCache();
      });

      expect(localStorage.getItem("character_cache")).toBeNull();
    });
  });

  describe("TTL invalidation", () => {
    it("should automatically remove expired entries via cleanup interval", async () => {
      const { result } = renderCache();

      act(() => {
        result.current.addToCache(mockCharacter(1));
      });

      await act(async () => {
        vi.advanceTimersByTime(CACHE_TTL + CLEANUP_INTERVAL + 1000);
      });

      expect(result.current.cachedCharacters).toHaveLength(0);
    });

    it("should call clearSearch when expired entries are removed", async () => {
      const { result } = renderCache();

      act(() => {
        result.current.addToCache(mockCharacter(1));
      });

      await act(async () => {
        vi.advanceTimersByTime(CACHE_TTL + CLEANUP_INTERVAL + 1000);
      });

      expect(mockClearSearch).toHaveBeenCalled();
    });
  });

  describe("persistence", () => {
    it("should load cache from localStorage on mount", () => {
      const character = mockCharacter(1);

      localStorage.setItem(
        "character_cache",
        JSON.stringify({
          cache: {
            1: { data: character, cachedAt: Date.now(), ttl: CACHE_TTL },
          },
          order: [1],
        }),
      );

      const { result } = renderCache();

      expect(result.current.cachedCharacters).toHaveLength(1);
      expect(result.current.cachedCharacters[0].id).toBe(1);
    });

    it("should not load expired entries from localStorage on mount", () => {
      const character = mockCharacter(1);

      localStorage.setItem(
        "character_cache",
        JSON.stringify({
          cache: {
            1: {
              data: character,
              cachedAt: Date.now() - CACHE_TTL - 1000,
              ttl: CACHE_TTL,
            },
          },
          order: [1],
        }),
      );

      const { result } = renderCache();

      expect(result.current.cachedCharacters).toHaveLength(0);
    });
  });
});
