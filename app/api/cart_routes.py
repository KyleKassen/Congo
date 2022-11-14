from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Product, ProductImage, Review, ReviewImage, User, db, CartItem
from sqlalchemy import func
from sqlalchemy.orm import joinedload, subqueryload
from ..forms.product_form import ProductForm
from ..forms.review_form import ReviewForm

cart_routes = Blueprint('carts', __name__)

@cart_routes.route('/<int:user_id>')
def get_cart_items(user_id):
    """
    Get All Cart Items
    """

    items = CartItem.query.filter_by(buyer_id=user_id).all()

    result = {'cartItems': [item.to_dict() for item in items]}

    return result
