import { SectionHeader } from "../../components";
import { CenteredColumnContainer, VerticalCenteredBody } from "../../styles";

export const NoLogged: React.FC = () => {
  return (
    <VerticalCenteredBody>
      <CenteredColumnContainer>
        <SectionHeader
          title="Lo siento, no estás logueado :("
          showBackButton={false}
        />
      </CenteredColumnContainer>
    </VerticalCenteredBody>
  );
};
