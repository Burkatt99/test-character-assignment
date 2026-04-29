import { useCallback, useEffect, useState } from "react";

import {
  CACHE_KEY,
  CACHE_TTL,
  CLEANUP_INTERVAL,
  MAX_CACHE_SIZE,
} from "@/constants";
import { CacheCharacters, ICacheEntry, ICharacter } from "@/types";
import { loadCache } from "@/utils";

interface IUseCharacterCache {
  cachedCharacters: ICharacter[];
  getFromCache: (id: number) => ICharacter | null;
  addToCache: (character: ICharacter) => void;
  removeFromCache: (id: number) => void;
  clearCache: () => void;
}

interface IUseCharacterCacheProps {
  clearSearch: () => void;
}

export const useCharacterCache = ({
  clearSearch,
}: IUseCharacterCacheProps): IUseCharacterCache => {
  const [cache, setCache] = useState<CacheCharacters>(loadCache().cache);
  const [order, setOrder] = useState<number[]>(loadCache().order);

  const isExpired = (entry: ICacheEntry) =>
    Date.now() - entry.cachedAt > entry.ttl;

  const updateCache = useCallback(
    (nextCache: CacheCharacters, nextOrder: number[]) => {
      setCache(nextCache);
      setOrder(nextOrder);

      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ cache: nextCache, order: nextOrder }),
      );
    },
    [],
  );

  const moveToEndList = (id: number, currentList: number[]) => [
    ...currentList.filter((i) => i !== id),
    id,
  ];

  const cleanupCache = useCallback(() => {
    const validOrder = order.filter((id) => {
      const entry = cache[id];

      return entry && !isExpired(entry);
    });

    if (validOrder.length === order.length) return;

    const nextCache = validOrder.reduce((acc, id) => {
      acc[id] = cache[id];

      return acc;
    }, {} as CacheCharacters);

    updateCache(nextCache, validOrder);
    clearSearch();
  }, [cache, order, updateCache]);

  useEffect(() => {
    const interval = setInterval(cleanupCache, CLEANUP_INTERVAL);

    return () => clearInterval(interval);
  }, [cleanupCache]);

  const getFromCache = (id: number): ICharacter | null => {
    const entry = cache[id];

    if (!entry) return null;

    if (isExpired(entry)) {
      const nextCache = { ...cache };

      delete nextCache[id];

      const nextOrder = order.filter((i) => i !== id);

      updateCache(nextCache, nextOrder);

      return null;
    }

    return entry.data;
  };

  const addToCache = (character: ICharacter) => {
    let nextOrder = moveToEndList(character.id, order);
    let nextCache = {
      ...cache,
      [character.id]: {
        data: character,
        cachedAt: Date.now(),
        ttl: CACHE_TTL,
      },
    };

    console.log("dfdf", nextCache, nextOrder);

    if (nextOrder.length > MAX_CACHE_SIZE) {
      const removed = nextOrder[0];

      nextOrder = nextOrder.slice(1);
      delete nextCache[removed];
    }

    updateCache(nextCache, nextOrder);
  };

  const removeFromCache = (id: number) => {
    const nextCache = { ...cache };

    delete nextCache[id];

    updateCache(
      nextCache,
      order.filter((i) => i !== id),
    );
  };

  const clearCache = () => {
    localStorage.removeItem(CACHE_KEY);
    setCache({});
    setOrder([]);
  };

  const cachedCharacters = order
    .map((id) => cache[id])
    .filter((e): e is ICacheEntry => e && !isExpired(e))
    .map((e) => e.data);

  return {
    cachedCharacters,
    getFromCache,
    addToCache,
    removeFromCache,
    clearCache,
  };
};
