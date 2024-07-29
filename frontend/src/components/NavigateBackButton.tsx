import { IconButton, styled } from "@mui/material";
import NavigateBackIcon from "@mui/icons-material/NavigateBefore";

const StyledIconButton = styled(IconButton)({
  padding: 0,
});
const StyledNavigateBackIcon = styled(NavigateBackIcon)({
  color: "black",
  fontSize: "30px",
});

interface NavigateBackButtonProps {
  onClick: () => void;
}

export const NavigateBackButton = ({ onClick }: NavigateBackButtonProps) => {
  return (
    <StyledIconButton onClick={onClick}>
      <StyledNavigateBackIcon />
    </StyledIconButton>
  );
};
