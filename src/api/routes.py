"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required
import bcrypt

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/login', methods=['POST'])
def log_user():
    body = request.json
    user = User.query.filter_by(email = body["email"]).one_or_none()
    if user is None:
        return jsonify({
            "msg": "Email or password invalid"
        }), 400

    valid_password = check_password_hash(user.hashed_password, f'{body["password"]}{user.salt}')
    if not valid_password:
        return jsonify({
            "msg": "Email or password invalid"
        }), 400

    access_token = create_access_token(identity=user.id)
    response_body = {
        "id": user.id,
        "name": user.name,
        "token": access_token,
        "phone": user.phone,
        "email": user.email,
        "last_name": user.last_name,
        "city": user.city,
    }

    return jsonify(response_body), 200

@api.route('/user/<int:userid>')
@jwt_required()
def get_user(userid):
    user = get_jwt_identity()
    get_user = User.query.get_or_404(userid)

    response_body = {
        "id": get_user.id,
        "name": get_user.name,
        "phone": get_user.phone,
        "email": get_user.email,
        "last_name": get_user.last_name,
        "city": get_user.city,
    }

    return jsonify(response_body), 200

@api.route('/register', methods=['POST'])

def make_user():
    if request.method == "POST":
        body = request.json
        user = User.query.filter_by(email = body["email"]).one_or_none()
        if user:
            return jsonify({
                "msg": "Email already in use"
            }), 400
        salt = bcrypt.gensalt().decode()
        hashed_password = generate_password_hash(f"{body['password']}{salt}")

        new_user = User(
            email=body['email'],
            phone=body['phone'],
            hashed_password=hashed_password,
            salt=salt,
            name=body['name'],
            last_name=body['last_name'],
            city=body['city'],
        )
        print(new_user.serialize())
        db.session.add(new_user)
        try:
            db.session.commit()
        except Exception as error:
            db.session.rollback()
            return jsonify({
                "msg":"something unexpected happened",
                "error msg": error.args
            }), 500
        return jsonify(new_user.serialize()),201