import { ICharacter } from "@/types";

import { Loader } from "../Loader/styled";
import Typography from "../Typography";
import { Avatar, AvatarLoader, Container, Info, InfoWrapper } from "./styled";

interface ICharacterProfileProps {
  character: ICharacter | null;
  isLoading: boolean;
  error: string | null;
}

const CharacterProfile = (props: ICharacterProfileProps) => {
  const { character, isLoading, error } = props;
  const { name, type, species, location, origin, status } = character || {};

  const imgSrc = character ? character.image : "/src/assets/avatar.png";

  const handleStatusColor = (status?: string) => {
    switch (status) {
      case "Alive":
        return "success";
      case "Dead":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <Container $isError={!!error}>
      {isLoading ? (
        <AvatarLoader>
          <Loader data-testid="loader" />
        </AvatarLoader>
      ) : (
        <Avatar src={imgSrc} alt="Character Avatar" loading="lazy" />
      )}

      {character && !isLoading && !error && (
        <InfoWrapper>
          <Typography text={name} title />

          <Info>
            <Typography text="Species" style="secondary" />
            <Typography text={species} bold style="primary" />
          </Info>

          <Info>
            <Typography text="Type" style="secondary" />
            <Typography text={type} bold style="primary" />
          </Info>

          <Info>
            <Typography text="Location" style="secondary" />
            <Typography text={location?.name} bold style="primary" />
          </Info>

          <Info>
            <Typography text="Origin" style="secondary" />
            <Typography text={origin?.name} bold style="primary" />
          </Info>

          <Info>
            <Typography text="Status" style="secondary" />
            <Typography text={status} bold style={handleStatusColor(status)} />
          </Info>
        </InfoWrapper>
      )}

      {!!error && <Typography text={error} style="danger" title />}
    </Container>
  );
};

export default CharacterProfile;
