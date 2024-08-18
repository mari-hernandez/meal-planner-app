import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Alert } from "@mui/material";
import { AlertProps, UserSignUpData } from "../../interfaces";
import { InputField, SectionHeader } from "../../components";
import { useAuth } from "../../contexts";
import {
  CenteredColumnContainer,
  FormContainer,
  PrimaryButton,
  VerticalCenteredBody,
} from "../../styles";
import axios from "axios";

export const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [alert, setAlert] = useState<AlertProps | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUpData>();

  const handleSignIn = useCallback(
    async (data: UserSignUpData) => {
      try {
        // TODO: Create a client component that will handle the API calls
        const backendUrl = process.env.REACT_APP_BACKEND_URL;

        const signInPayload = {
          email: data.email,
          password: data.password,
        };
        console.log({ signInPayload });

        const response = await axios.post(
          `${backendUrl}/auth/login`,
          signInPayload
        );

        if (response.status === 200) {
          login({ token: response.data.token });
          navigate("/home");
        }
      } catch (error) {
        console.error("Error correo o contraeña incorrecta:", error);
        setAlert({
          message: "Error correo o contraeña incorrecta",
          severity: "error",
        });
        setTimeout(() => setAlert(null), 3000);
      }
    },
    [login, navigate]
  );
  return (
    <VerticalCenteredBody>
      <SectionHeader title="Iniciar sesión" />
      <CenteredColumnContainer>
        <FormContainer onSubmit={handleSubmit(handleSignIn)}>
          <InputField
            label="Correo"
            parameterName="email"
            register={register}
            errors={errors}
            errorText="Debes ingresar un correo"
            type="email"
          />

          <InputField
            label="Contraseña"
            parameterName="password"
            register={register}
            errors={errors}
            errorText="Debes ingresar una contraseña"
            type="password"
          />

          <PrimaryButton type="submit">Iniciar sesión</PrimaryButton>
        </FormContainer>
        {alert && <Alert severity={alert.severity}>{alert.message}</Alert>}
      </CenteredColumnContainer>
    </VerticalCenteredBody>
  );
};
