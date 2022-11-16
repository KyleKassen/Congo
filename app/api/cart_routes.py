from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Product, ProductImage, Review, ReviewImage, User, db, CartItem
from sqlalchemy import func
from sqlalchemy.orm import joinedload, subqueryload, immediateload
from ..forms.product_form import ProductForm
from ..forms.review_form import ReviewForm

cart_routes = Blueprint('carts', __name__)

@cart_routes.route('/<int:user_id>')
def get_cart_items(user_id):
    """
    Get All Cart Items
    """

    items = CartItem.query.filter_by(buyer_id=user_id).options(joinedload(CartItem.product)).all()


    result = []

    for item in items:
        product_image = ProductImage.query.filter_by(product_id=item.product.id).first()
        product = item.product.to_dict()
        product['image'] = product_image.to_dict()
        currItem = {
            "id":item.id,
            "quantity":item.quantity,
            "product":product
        }
        result.append(currItem)

    return {'cartItems': result}


@cart_routes.route('/<int:product_id>', methods=['POST'])
def add_cart_item(product_id):
    """
    Add a cart Items
    """

    user = current_user.to_dict()
    user_id = user['id']

    item = CartItem.query.filter_by(product_id=product_id).one()
    product = Product.query.get(product_id)

    if item:
        item.quantity += 1
    else:
        item = CartItem(
            buyer_id=user_id,
            product_id=product_id,
            quantity=1
        )
        db.session.add(item)

    db.session.commit()

    result = {
        "id":item.id,
        "quantity":item.quantity,
        "product":product.to_dict()
    }

    return result


@cart_routes.route('/<int:product_id', methods=['PUT'])
def edit_cart_item(product_id):
    """
    Edit a cart Item
    """

    item = CartItem.query.filter_by(product_id=product_id).one()
