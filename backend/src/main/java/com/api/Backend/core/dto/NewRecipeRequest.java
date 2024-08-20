package com.api.Backend.core.dto;

import lombok.*;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NewRecipeRequest {
    @Getter
    private UUID userId;
    private String name;
    private Long preparationTime;
    private Long portions;
    private Long categoryId;
    private String instructions;
    private String description;
    private String imageUrl;
    private String difficultyLevel;
    private List<RecipeIngredientRequest> ingredients;
}

