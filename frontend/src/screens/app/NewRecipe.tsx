import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { BottomNavBar, InputField } from "../../components";
import {
  Body,
  CenteredColumnContainer,
  FormContainer,
  PrimaryButton,
  SecondaryButton,
  WhiteSpace,
} from "../../styles";
import { useAuth } from "../../contexts";
import axios from "axios";

const Row = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "4px",
});

interface Category {
  id: string;
  name: string;
}

interface IngredientData {
  ingredient_id: string;
  quantity: string;
  unit: string;
}

interface Ingredient {
  id: string;
  name: string;
}

interface NewRecipeData {
  name: string;
  preparation_time: string;
  portions: string;
  category_id: string;
  instructions: string;
  description: string;
  image_url: string;
  difficulty_level: string;
  ingredients: IngredientData[];
}

export const NewRecipe: React.FC = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  console.log({
    categories,
    ingredients,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NewRecipeData>({
    defaultValues: {
      name: "",
      preparation_time: "",
      portions: "",
      category_id: "",
      instructions: "",
      description: "",
      image_url: "",
      difficulty_level: "",
      ingredients: [],
    },
  });

  const category_id = watch("category_id");
  const difficulty_level = watch("difficulty_level");
  const IngredientsData = watch("ingredients");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        if (!user) {
          throw new Error("User is not logged in");
        }
        const response = await axios.get(`${backendUrl}/recipe/categories`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        console.log({ response });
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchIngredients = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        if (!user) {
          throw new Error("User is not logged in");
        }
        const response = await axios.get(`${backendUrl}/recipe/ingredients`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setIngredients(response.data);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    fetchCategories();
    fetchIngredients();
  }, [user]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setValue(name, value);
  };

  const handleIngredientChange = (index: number, e: any) => {
    const { name, value } = e.target;
    const newIngredients = [...IngredientsData];
    newIngredients[index] = {
      ...newIngredients[index],
      [name]: value,
    };
    setValue("ingredients", newIngredients);
  };

  const handleAddIngredient = () => {
    setValue("ingredients", [
      ...IngredientsData,
      { ingredient_id: "", quantity: "", unit: "" },
    ]);
  };

  const handleRemoveIngredient = (index: number) => {
    setValue(
      "ingredients",
      IngredientsData.filter((_, i) => i !== index)
    );
  };

  const handleNewRecipe = useCallback(
    async (data: NewRecipeData) => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        if (!user) {
          throw new Error("User is not logged in");
        }
        const newRecipePayload = {
          name: data.name,
          preparation_time: data.preparation_time,
          portions: data.portions,
          category_id: data.category_id,
          instructions: data.instructions,
          description: data.description,
          image_url: data.image_url,
          difficulty_level: data.difficulty_level,
          ingredients: data.ingredients,
        };
        console.log({ newRecipePayload });

        const response = await axios.post(
          `${backendUrl}/recipe/new`,
          newRecipePayload,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (response.status === 201) {
          console.log("Recipe created successfully");
        }
      } catch (error) {
        console.error("Error creating recipe:", error);
      }
    },
    [user]
  );

  return (
    <Body>
      <CenteredColumnContainer>
        <Typography variant="h3">Nueva Receta</Typography>
        <FormContainer onSubmit={handleSubmit(handleNewRecipe)}>
          <InputField
            label="Nombre"
            parameterName="name"
            register={register}
            errors={errors}
            errorText="Nombre es requerido"
          />

          <InputField
            label="Tiempo de preparación (minutos)"
            parameterName="preparation_time"
            register={register}
            errors={errors}
            errorText="Tiempo de preparación es requerido"
            type="number"
          />

          <InputField
            label="Porciones"
            parameterName="portions"
            register={register}
            errors={errors}
            errorText="Porciones es requerido"
            type="number"
          />

          <InputLabel id="category-label">Categoría</InputLabel>
          <Select
            labelId="category-label"
            name="category_id"
            value={category_id}
            onChange={handleInputChange}
            fullWidth
            required
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>

          <InputField
            label="Instrucciones"
            parameterName="instructions"
            register={register}
            errors={errors}
            errorText="Instrucciones son requeridas"
            multiline
            rows={4}
          />

          <InputField
            label="Descripción"
            parameterName="description"
            register={register}
            errors={errors}
            errorText="Descripción es requerida"
          />

          <InputField
            label="URL de la imagen"
            parameterName="image_url"
            register={register}
            errors={errors}
            errorText="URL de la imagen es requerida"
          />

          <InputLabel id="difficulty-label">Nivel de Dificultad</InputLabel>
          <Select
            labelId="difficulty-label"
            name="difficulty_level"
            value={difficulty_level}
            onChange={handleInputChange}
            fullWidth
            required
          >
            <MenuItem value="Easy">Fácil</MenuItem>
            <MenuItem value="Medium">Medio</MenuItem>
            <MenuItem value="Hard">Difícil</MenuItem>
          </Select>

          <Typography variant="h6">Ingredientes</Typography>
          {IngredientsData.map((ingredient, index) => (
            <Row key={index}>
              <Select
                name="ingredient_id"
                value={ingredient.ingredient_id}
                onChange={(e) => handleIngredientChange(index, e)}
                fullWidth
                required
              >
                {ingredients.map((ing) => (
                  <MenuItem key={ing.id} value={ing.id}>
                    {ing.name}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                name="quantity"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, e)}
                type="number"
                label="Cantidad"
                fullWidth
                required
              />
              <TextField
                name="unit"
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, e)}
                label="Unidad"
                fullWidth
                required
              />
              <IconButton
                color="error"
                onClick={() => handleRemoveIngredient(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Row>
          ))}

          <SecondaryButton onClick={handleAddIngredient}>
            Agregar Ingrediente
          </SecondaryButton>
          <PrimaryButton type="submit">Crear Receta</PrimaryButton>

          <WhiteSpace />
        </FormContainer>
      </CenteredColumnContainer>
      <BottomNavBar />
    </Body>
  );
};
