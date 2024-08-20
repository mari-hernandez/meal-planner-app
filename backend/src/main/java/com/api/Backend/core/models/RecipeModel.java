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
@Table(name = "recipe")
public class RecipeModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", nullable = false)
    private UserModel createdBy;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private long preparationTime;

    @Column(nullable = false)
    private long portions;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private RecipeCategoryModel category;

    @Column(nullable = false)
    private String instructions;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private String difficultyLevel;

}
