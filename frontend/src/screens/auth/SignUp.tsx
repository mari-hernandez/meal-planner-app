import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Alert } from "@mui/material";
import { AlertProps, UserSignUpData } from "../../interfaces";
import { InputField, SectionHeader } from "../../components";
import {
  CenteredColumnContainer,
  FormContainer,
  PrimaryButton,
  VerticalCenteredBody,
} from "../../styles";
import axios from "axios";

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState<AlertProps | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUpData>();

  const handleSignUp = useCallback(
    async (data: UserSignUpData) => {
      try {
        // TODO: Create a client component that will handle the API calls
        const backendUrl = process.env.REACT_APP_BACKEND_URL;

        const signUpPayload = {
          email: data.email,
          username: data.username,
          password: data.password,
        };
        console.log({ signUpPayload });

        const response = await axios.post(
          `${backendUrl}/auth/register`,
          signUpPayload
        );

        if (response.status === 201) {
          setAlert({
            message: "Usuario Creado Exitosamente!",
            severity: "success",
          });
          setTimeout(() => {
            setAlert(null);
            navigate("/signin");
          }, 3000);
        }
      } catch (error) {
        console.error("Error creando el usuario:", error);
        setAlert({
          message: "Error creando el usuario",
          severity: "error",
        });
        setTimeout(() => setAlert(null), 3000);
      }
    },
    [navigate]
  );
  return (
    <VerticalCenteredBody>
      <SectionHeader title="Regístrate en Meal Planner" />
      <CenteredColumnContainer>
        <FormContainer onSubmit={handleSubmit(handleSignUp)}>
          <InputField
            label="Correo"
            parameterName="email"
            register={register}
            errors={errors}
            errorText="Debes ingresar un correo"
            type="email"
          />

          <InputField
            label="Nombre de usuario"
            parameterName="username"
            register={register}
            errors={errors}
            errorText="Debes ingresar un nombre de usuario"
          />

          <InputField
            label="Contraseña"
            parameterName="password"
            register={register}
            errors={errors}
            errorText="Debes ingresar una contraseña"
            type="password"
          />

          <PrimaryButton type="submit">Regístrate</PrimaryButton>
        </FormContainer>

        {alert && <Alert severity={alert.severity}>{alert.message}</Alert>}
      </CenteredColumnContainer>
    </VerticalCenteredBody>
  );
};
