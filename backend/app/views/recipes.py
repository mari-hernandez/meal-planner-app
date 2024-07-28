from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from ..models import Recipe, RecipeCategory, Ingredient, RecipeIngredient, RecipeLike,  db

recipes_bp = Blueprint('recipes', __name__)

# Endpoint para obtener todas las categorías
@recipes_bp.route('/categories', methods=['GET'])
@jwt_required()
def get_categories():
    categories = RecipeCategory.query.all()
    return jsonify([category.to_dict() for category in categories]), 200


# Endpoint para obtener todos los ingredientes
@recipes_bp.route('/ingredients', methods=['GET'])
@jwt_required()
def get_ingredients():
    ingredients = Ingredient.query.all()
    return jsonify([ingredient.to_dict() for ingredient in ingredients]), 200


# Endpoint para obtener todas las recetas
@recipes_bp.route('/', methods=['GET'])
@jwt_required()
def get_recipes():
    recipes = Recipe.query.all()
    return jsonify([recipe.to_dict() for recipe in recipes]), 200


# Endpoint para crear una nueva receta
@recipes_bp.route('/new', methods=['POST'])
@jwt_required()
def create_recipe():
    data = request.get_json()
    user_id = get_jwt_identity()
    
    new_recipe = Recipe(
        created_by= user_id,
        name=data['name'],
        preparation_time=data['preparation_time'],
        portions=data['portions'],
        category_id=data['category_id'],
        instructions=data['instructions'],
        description=data.get('description'),
        image_url=data.get('image_url'),
        difficulty_level=data.get('difficulty_level')
    )
    
    db.session.add(new_recipe)
    db.session.commit()

    # Adding ingredients to the recipe
    for ingredient_data in data['ingredients']:
        new_ingredient = RecipeIngredient(
            recipe_id=new_recipe.id,
            quantity=ingredient_data['quantity'],
            ingredient_id=ingredient_data['ingredient_id'],
            unit=ingredient_data['unit']
        )
        db.session.add(new_ingredient)
    
    db.session.commit()
    return jsonify(new_recipe.to_dict()), 201


# Endpoint para dar like a una receta
@recipes_bp.route('/<int:recipe_id>/like', methods=['POST'])
@jwt_required()
def like_recipe(recipe_id):
    user_id = get_jwt_identity()
    existing_like = RecipeLike.query.filter_by(recipe_id=recipe_id, user_id=user_id).first()
    
    if existing_like:
        return jsonify({'message': 'Recipe already liked'}), 400

    new_like = RecipeLike(recipe_id=recipe_id, user_id=user_id)
    db.session.add(new_like)
    db.session.commit()
    return jsonify({'message': 'Recipe liked successfully'}), 201


# Endpoint para quitar like a una receta
@recipes_bp.route('/<int:recipe_id>/unlike', methods=['POST'])
@jwt_required()
def unlike_recipe(recipe_id):
    user_id = get_jwt_identity()
    existing_like = RecipeLike.query.filter_by(recipe_id=recipe_id, user_id=user_id).first()
    
    if not existing_like:
        return jsonify({'message': 'Recipe not liked'}), 400

    db.session.delete(existing_like)
    db.session.commit()
    return jsonify({'message': 'Recipe unliked successfully '}), 200