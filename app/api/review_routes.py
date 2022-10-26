from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Product, ProductImage, Review, ReviewImage, User, db
from sqlalchemy import func
from sqlalchemy.orm import joinedload, subqueryload
from ..forms.product_form import ProductForm

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/<int:id>')
def get_products(id):
    """
    Update a review
    """

    products = Product.query.options(joinedload(Product.product_image)).all()
    #products = Product.query.join(ProductImage).all()

    result = {'products': []}
    for product in products:
        curr_product = product.to_dict()
        curr_product['images'] = [image.to_dict()
                                  for image in product.product_image]

        result['products'].append(curr_product)

    # return {'products': [image.to_dict() for product in products for image in product.product_image]}
    return result
