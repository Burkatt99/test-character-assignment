import { useState } from "react";

import { fetchCharacterById } from "@/api";
import CacheList from "@/components/CacheList";
import CharacterProfile from "@/components/CharacterProfile";
import Search from "@/components/Search";
import { useCharacterCache } from "@/hooks/useCharacterCache";
import { ICharacter } from "@/types";

import { PageContainer, SearchResult } from "./styled";

const CharacterSearching = () => {
  const [characterId, setCharacterId] = useState<string>("");
  const [character, setCharacter] = useState<ICharacter | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClearSearch = () => {
    setCharacter(null);
    setCharacterId("");
    setError(null);
  };

  const {
    cachedCharacters,
    getFromCache,
    addToCache,
    removeFromCache,
    clearCache,
  } = useCharacterCache({ clearSearch: handleClearSearch });

  const handleChange = (value: string) => {
    setCharacterId(value);

    const id = Number(value);

    if (!id) return;

    const cached = getFromCache(id);

    if (cached) {
      setCharacter(cached);
      setError(null);
    }
  };

  const handleSearch = () => {
    if (!characterId) return;

    const cached = getFromCache(Number(characterId));

    if (cached) {
      setCharacter(cached);

      return;
    }

    setIsLoading(true);
    setError(null);

    fetchCharacterById(Number(characterId))
      .then((data) => {
        addToCache(data);
        setCharacter(data);
      })
      .catch((err) => {
        setError(err.message);
        setCharacter(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSelectFromCache = (character: ICharacter) => {
    setCharacter(character);
    setCharacterId(String(character.id));
    setError(null);
  };

  const handleRemoveFromCache = (id: number) => {
    removeFromCache(id);

    if (character?.id === id) {
      handleClearSearch();
    }
  };

  const handleClearAllCache = () => {
    clearCache();
    handleClearSearch();
  };

  return (
    <PageContainer>
      <SearchResult>
        <Search
          value={characterId}
          isLoading={isLoading}
          onChange={handleChange}
          onSearch={handleSearch}
        />

        <CharacterProfile
          isLoading={isLoading}
          character={character}
          error={error}
        />
      </SearchResult>

      <CacheList
        characters={cachedCharacters}
        selectedId={character?.id ?? null}
        onSelect={handleSelectFromCache}
        onRemove={handleRemoveFromCache}
        onClearAll={handleClearAllCache}
      />
    </PageContainer>
  );
};

export default CharacterSearching;
