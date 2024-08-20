package com.api.Backend.core.services;

import com.api.Backend.core.dto.NewRecipeRequest;
import com.api.Backend.core.dto.RecipeIngredientRequest;
import com.api.Backend.core.models.*;
import com.api.Backend.core.repositories.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class RecipeService {

    @Autowired
    private final IIngredientRepository ingredientRepository;
    private final IRecipeCategoryRepository categoryRepository;
    private final IRecipeIngredientRepository recipeIngredientRepository;
    private final IRecipeLikeRepository recipeLikeRepository;
    private final IRecipeRepository recipeRepository;
    private final IUserRepository userRepository ;

    public RecipeService(IIngredientRepository ingredientRepository,
                         IRecipeCategoryRepository categoryRepository,
                         IRecipeIngredientRepository recipeIngredientRepository,
                         IRecipeLikeRepository recipeLikeRepository,
                         IRecipeRepository recipeRepository,
                         IUserRepository userRepository) {
        this.ingredientRepository = ingredientRepository;
        this.categoryRepository = categoryRepository;
        this.recipeIngredientRepository = recipeIngredientRepository;
        this.recipeLikeRepository = recipeLikeRepository;
        this.recipeRepository = recipeRepository;
        this.userRepository = userRepository;
    }

    public List<RecipeCategoryModel> getCategories() {
        return categoryRepository.findAll();
    }

    public List<IngredientModel> getIngredients() {
        return ingredientRepository.findAll();
    }

    public List<RecipeModel> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public RecipeModel getRecipe(long id) {
        return recipeRepository.findById(id).orElse(null);
    }

    public RecipeModel createRecipe(NewRecipeRequest request, UUID userId) {
        UserModel user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        RecipeCategoryModel category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));

        RecipeModel recipe = RecipeModel.builder()
                .createdBy(user)
                .name(request.getName())
                .preparationTime(request.getPreparationTime())
                .portions(request.getPortions())
                .category(category)
                .instructions(request.getInstructions())
                .description(request.getDescription())
                .imageUrl(request.getImageUrl())
                .difficultyLevel(request.getDifficultyLevel())
                .build();

        recipe = recipeRepository.save(recipe);


        for (RecipeIngredientRequest ingredient : request.getIngredients()) {
            IngredientModel ingredientModel = ingredientRepository.findById(ingredient.getIngredientId())
                    .orElseThrow(() -> new EntityNotFoundException("Ingredient not found"));

            RecipeIngredientModel recipeIngredient = RecipeIngredientModel.builder()
                    .recipe(recipe)
                    .ingredient(ingredientModel)
                    .quantity(ingredient.getQuantity())
                    .unit(ingredient.getUnit())
                    .build();

            recipeIngredientRepository.save(recipeIngredient);
        }

        return recipe;

    }
}
