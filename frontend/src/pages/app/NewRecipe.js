import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import BottomNavBar from '../../components/BottomNavBar';
import CustomHeading from '../../components/CustomText';
import CustomPrincipalDiv from '../../components/CustomDiv';
import { TextField, MenuItem, Select, InputLabel, IconButton, Typography } from '@mui/material';
import CustomButton from '../../components/CustomButton';
import DeleteIcon from '@mui/icons-material/Delete';

const RecipeForm = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    preparation_time: '',
    portions: '',
    category_id: '',
    instructions: '',
    description: '',
    image_url: '',
    difficulty_level: '',
    ingredients: []
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        const response = await axios.get(`${backendUrl}/recipe/categories`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchIngredients = async () => {
      try {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        const response = await axios.get(`${backendUrl}/recipe/ingredients`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setIngredients(response.data);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchCategories();
    fetchIngredients();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = { ...newIngredients[index], [name]: value };
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const handleAddIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { ingredient_id: '', quantity: '', unit: '' }]
    });
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      await axios.post(`${backendUrl}/recipe/new`, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      // Handle success (e.g., redirect or show a success message)
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

  return (
    <div>
      <CustomPrincipalDiv>
        <CustomHeading>
          Nueva Receta
        </CustomHeading>
        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <TextField
            label="Nombre"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            label="Tiempo de Preparación (minutos)"
            name="preparation_time"
            type="number"
            value={formData.preparation_time}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            label="Porciones"
            name="portions"
            type="number"
            value={formData.portions}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <InputLabel id="category-label">Categoría</InputLabel>
          <Select
            labelId="category-label"
            name="category_id"
            value={formData.category_id}
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
          <TextField
            label="Instrucciones"
            name="instructions"
            value={formData.instructions}
            onChange={handleInputChange}
            multiline
            rows={4}
            fullWidth
            required
          />
          <TextField
            label="Descripción"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <TextField
            label="URL de Imagen"
            name="image_url"
            value={formData.image_url}
            onChange={handleInputChange}
            fullWidth
            required
          />
          <InputLabel id="difficulty-label">Nivel de Dificultad</InputLabel>
          <Select
            labelId="difficulty-label"
            name="difficulty_level"
            value={formData.difficulty_level}
            onChange={handleInputChange}
            fullWidth
            required
          >
            <MenuItem value="Easy">Fácil</MenuItem>
            <MenuItem value="Medium">Medio</MenuItem>
            <MenuItem value="Hard">Difícil</MenuItem>
          </Select>
          <Typography variant="h6">Ingredientes</Typography>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center gap-4 mb-2">
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
                variant="outlined"
                color="error"
                onClick={() => handleRemoveIngredient(index)}
              >
                <DeleteIcon />
                </IconButton>
            </div>
          ))}
          <CustomButton color="secondary" onClick={handleAddIngredient}>
            Agregar Ingrediente
          </CustomButton>
          <CustomButton color="primary" type="submit">
            Enviar Receta
          </CustomButton>
        </form>
      </CustomPrincipalDiv>
      <div className="h-24"></div>
      <BottomNavBar />
    </div>
  );
};

export default RecipeForm;
