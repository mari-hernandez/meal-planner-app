import { Box, Button, styled } from "@mui/material";

// Containers
export const VerticalCenteredBody = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "calc(100svh - 32px)",
  margin: "0",
});
export const CenteredColumnContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "16px",
});

export const FormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "32px",
});

// Buttons
export const PrimaryButton = styled(Button)({
  fontSize: "16px",
  fontWeight: 400,
  textTransform: "none",
});

export const SecondaryButton = styled(Button)({
  fontSize: "16px",
  fontWeight: 400,
  textTransform: "none",
});

// Texts
export const HelperText = styled("p")({
  fontSize: "16px",
  color: "gray",
  margin: 0,
});

// Other
export const WhiteSpace = styled(Box)({
  height: "32px",
});
