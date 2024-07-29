import { Box, Button, styled } from "@mui/material";

// Containers
export const Body = styled(Box)({
  gap: "16px",
  padding: "48px",
});

export const CenteredColumnContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100svh",
  padding: "16px",
  gap: "16px",
});

export const FormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
});

// Buttons
export const PrimaryButton = styled(Button)({});

export const SecondaryButton = styled(Button)({});

// Texts
export const HelperText = styled("p")({
  fontSize: "16px",
  color: "gray",
});

// Other
export const WhiteSpace = styled(Box)({
  height: "32px",
});
