import { BASE_URL } from "@/constants";
import { ICharacter } from "@/types";

export const fetchCharacterById = async (id: number): Promise<ICharacter> => {
  const response = await fetch(`${BASE_URL}/character/${id}`);

  if (!response.ok) {
    throw new Error(`Character not found`);
  }

  return response.json();
};
