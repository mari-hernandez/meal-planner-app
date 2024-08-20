package com.api.Backend.core.repositories;

import com.api.Backend.core.models.RecipeModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping
public interface IRecipeRepository extends JpaRepository<RecipeModel, Long> {
}
