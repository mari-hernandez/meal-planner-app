import { Link } from "react-router-dom";
import { Typography, styled } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import {
  CenteredColumnContainer,
  HelperText,
  PrimaryButton,
} from "../../styles";

const StyledRestaurantMenuIcon = styled(RestaurantMenuIcon)({
  fontSize: "64px",
  color: "gray",
});

export const Landing: React.FC = () => {
  return (
    <CenteredColumnContainer>
      <StyledRestaurantMenuIcon />
      <Typography variant="h3">
        Te damos la bienvenida a Meal Planner
      </Typography>
      <Link to="/register">
        <PrimaryButton>Regístrate</PrimaryButton>
      </Link>
      <Link to="/signin">
        <PrimaryButton>Iniciar sesión</PrimaryButton>
      </Link>
      <HelperText>
        Si continúas, aceptas los Términos del servicio de Meal Planner y
        confirmas que has leído nuestra Política de privacidad.
      </HelperText>
    </CenteredColumnContainer>
  );
};
