package com.api.Backend.core.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "recipe_like" , uniqueConstraints = {
        @UniqueConstraint(columnNames = {"recipe_id" , "user_id"})
})
public class RecipeLikeModel {
    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    private RecipeModel recipeId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserModel userId;

    @CreationTimestamp
    private LocalDateTime createdAt;

}
