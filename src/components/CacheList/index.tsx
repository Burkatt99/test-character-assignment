import { ICharacter } from "@/types";

import Button from "../Button";
import { CloseButton, ImgBox, ListContainer, MiniAvatar } from "./styled";

interface ICacheListProps {
  characters: ICharacter[];
  selectedId: number | null;
  onSelect: (character: ICharacter) => void;
  onRemove: (id: number) => void;
  onClearAll: () => void;
}

const CacheList = (props: ICacheListProps) => {
  const { characters, selectedId, onSelect, onRemove, onClearAll } = props;

  return (
    <ListContainer>
      {!!characters.length && <Button text="Clear All" onClick={onClearAll} />}

      {characters.map((character) => {
        const isSelected = character.id === selectedId;

        return (
          <ImgBox
            $isSelected={isSelected}
            key={character.id}
            onClick={() => onSelect(character)}
          >
            <CloseButton
              close
              onClick={(e) => {
                e?.stopPropagation();
                onRemove(character.id);
              }}
            />

            <MiniAvatar
              src={character.image}
              $isSelected={isSelected}
              loading="lazy"
            />
          </ImgBox>
        );
      })}
    </ListContainer>
  );
};

export default CacheList;
