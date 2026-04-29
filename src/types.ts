export type ICharacterStatus = "Alive" | "Dead" | "unknown";

type Location = {
  name: string;
  url: string;
};

type Origin = {
  name: string;
  url: string;
};

export interface ICharacter {
  id: number;
  name: string;
  status: ICharacterStatus;
  species: string;
  type: string;
  location: Location;
  origin: Origin;
  image: string;
}

export interface ICacheEntry {
  data: ICharacter;
  cachedAt: number;
  ttl: number;
}

export type CacheCharacters = Record<number, ICacheEntry>;
