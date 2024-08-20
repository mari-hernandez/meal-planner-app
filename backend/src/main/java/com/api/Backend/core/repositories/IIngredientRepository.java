package com.api.Backend.core.repositories;

import com.api.Backend.core.models.IngredientModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping
public interface IIngredientRepository extends JpaRepository<IngredientModel, Long> {
}
