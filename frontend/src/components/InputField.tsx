import { PropsWithChildren } from "react";
import {
  Box,
  InputLabel,
  TextField,
  TextFieldProps,
  Typography,
  styled,
} from "@mui/material";
import { theme } from "../config/theme";
import { FieldErrors, UseFormRegister } from "react-hook-form";

const Container = styled(Box)({
  position: "relative",
});

const StyledInputLabel = styled(InputLabel)({
  fontWeight: 500,
  color: theme.palette.text.black,
  paddingBottom: "0.25rem",
});

const StyledInput = styled(TextField)({
  backgroundColor: theme.palette.background.white,
  "& input": {
    width: "250px",
    minHeight: "32px",
    textAlign: "left",
    padding: "12px",
  },
});

const ErrorMessage = styled(Typography)({
  position: "absolute",
  fontSize: "0.75rem",
  color: theme.palette.errors.primary,
});

interface InputFieldWrapperProps {
  label: string;
  error?: string;
}

export const InputFieldWrapper: React.FC<
  PropsWithChildren<InputFieldWrapperProps>
> = ({ label, error, children }) => {
  return (
    <Container>
      {Boolean(label) && <StyledInputLabel>{label}</StyledInputLabel>}
      {children}
      {Boolean(error) && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

interface InputProps {
  label: string;
  parameterName: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  errorText?: string;
}

export const InputField: React.FC<TextFieldProps & InputProps> = (props) => {
  const { label, parameterName, register, errors, errorText, ...rest } = props;

  const errorMessage = errors[parameterName]?.message;
  const errorString =
    typeof errorMessage === "string" ? errorMessage : undefined;
  return (
    <InputFieldWrapper label={label} error={errorString}>
      <StyledInput
        {...rest}
        variant="outlined"
        error={Boolean(errors[parameterName])}
        {...register(parameterName, {
          required: errorText ?? false,
        })}
      />
    </InputFieldWrapper>
  );
};
