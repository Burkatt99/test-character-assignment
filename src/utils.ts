import { CACHE_KEY } from "@/constants";
import { CacheCharacters } from "@/types";

export const loadCache = (): {
  cache: CacheCharacters;
  order: number[];
} => {
  try {
    const jsonData = localStorage.getItem(CACHE_KEY);

    if (!jsonData) return { cache: {}, order: [] };

    return JSON.parse(jsonData);
  } catch {
    return { cache: {}, order: [] };
  }
};
