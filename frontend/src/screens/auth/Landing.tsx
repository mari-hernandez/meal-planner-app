import { Link } from "react-router-dom";
import { Box, styled } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { SectionHeader } from "../../components";
import {
  CenteredColumnContainer,
  HelperText,
  PrimaryButton,
  VerticalCenteredBody,
} from "../../styles";

const HeaderWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "16px",
});

const StyledRestaurantMenuIcon = styled(RestaurantMenuIcon)({
  fontSize: "64px",
  color: "gray",
});

export const Landing: React.FC = () => {
  return (
    <VerticalCenteredBody>
      <CenteredColumnContainer>
        <HeaderWrapper>
          <StyledRestaurantMenuIcon />
          <SectionHeader
            title="Te damos la bienvenida a Meal Planner"
            showBackButton={false}
          />
        </HeaderWrapper>
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
    </VerticalCenteredBody>
  );
};
