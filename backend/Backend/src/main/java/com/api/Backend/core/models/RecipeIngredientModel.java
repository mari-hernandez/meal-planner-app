package com.api.Backend.core.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "recipe_ingredient")
public class RecipeIngredientModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    private RecipeModel recipe;

    @Column(nullable = false)
    private String quantity;

    @ManyToOne
    @JoinColumn(name = "ingredient_id", nullable = false)
    private IngredientModel ingredient;

    @Column
    private String unit;
}
