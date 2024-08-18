import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Box, styled, Typography } from "@mui/material";
import { NavigateBackButton } from "./NavigateBackButton";
import { theme } from "../config/theme";

const HeaderContainer = styled(Box)<{ hasBackButton: boolean }>(
  ({ hasBackButton }) => ({
    display: "grid",
    gridTemplateColumns: hasBackButton ? "auto 1fr" : "1fr",
    alignItems: "center",
    columnGap: "16px",
    marginBottom: hasBackButton ? "32px" : "0px",
  })
);

const Title = styled(Typography)({
  fontSize: "32px",
  fontWeight: 500,
  textAlign: "center",
  color: theme.palette.text.black,
});

export const SectionHeader: React.FC<{
  title: string;
  showBackButton?: boolean;
}> = ({ title, showBackButton = true }) => {
  const navigate = useNavigate();
  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);
  return (
    <HeaderContainer hasBackButton={showBackButton}>
      {showBackButton && <NavigateBackButton onClick={handleBack} />}
      <Title>{title}</Title>
    </HeaderContainer>
  );
};
