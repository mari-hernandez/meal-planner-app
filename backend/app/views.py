from flask import Blueprint, jsonify, request
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from .models import User, db

bcrypt = Bcrypt()
jwt = JWTManager()

main_bp = Blueprint('main', __name__)

@main_bp.route('/register', methods=['POST'])
def register():
    print('register!!')
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(username=data['username'], email=data['email'], password=hashed_password)
    
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully!'}), 201

@main_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify({'token': access_token})
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@main_bp.route('/home', methods=['GET'])
@jwt_required()
def get_username():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user:
        return jsonify({'username': user.username}), 200
    else:
        return jsonify({'message': 'User not found'}), 404