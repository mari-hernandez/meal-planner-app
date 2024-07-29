import { Typography } from "@mui/material";
import { CenteredColumnContainer } from "../../styles";

export const NoLogged: React.FC = () => {
  return (
    <CenteredColumnContainer>
      <Typography variant="h3">Lo siento, no estás logueado :(</Typography>
    </CenteredColumnContainer>
  );
};
