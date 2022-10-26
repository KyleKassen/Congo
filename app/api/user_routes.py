from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, ShippingAddress

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


"""
Shipping Address Routes
"""
@user_routes.route('/<int:id>/addresses')
@login_required
def get_addresses(id):

    print('\n\n\n\n\n\n\n', current_user.to_dict())
    user = current_user.to_dict()
    user_id = user['id']

    if (user_id != id):
        return {
            "statusCode": 400,
            "message": "Not the correct user"
        }

    addresses = ShippingAddress.query.filter_by(user_id = id).all()

    return {
        'addresses': [address.to_dict() for address in addresses]
    }
