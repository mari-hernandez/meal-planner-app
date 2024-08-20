package com.api.Backend.core.controllers;

import com.api.Backend.core.dto.NewRecipeRequest;
import com.api.Backend.core.models.IngredientModel;
import com.api.Backend.core.models.RecipeCategoryModel;
import com.api.Backend.core.models.RecipeModel;
import com.api.Backend.core.models.UserModel;
import com.api.Backend.core.services.RecipeService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/recipe")
public class RecipeController {

    @Autowired
    private RecipeService recipeService;

    @GetMapping("/categories")
    public List<RecipeCategoryModel> getCategories() {
        return recipeService.getCategories();
    }

    @GetMapping("/ingredients")
    public List<IngredientModel> getIngredients() {
        return recipeService.getIngredients();
    }

    @PostMapping("/new")
    public RecipeModel createRecipe(@RequestBody NewRecipeRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserModel user = (UserModel) authentication.getPrincipal();
        UUID userId = user.getId();
        return recipeService.createRecipe(request, userId);
    }

}
