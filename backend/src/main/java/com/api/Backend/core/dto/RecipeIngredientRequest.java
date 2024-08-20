package com.api.Backend.core.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecipeIngredientRequest {
    private Long ingredientId;
    private String quantity;
    private String unit;
}
