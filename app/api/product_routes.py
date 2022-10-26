from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Product, ProductImage, Review, ReviewImage
from sqlalchemy.orm import joinedload, subqueryload

product_routes = Blueprint('products', __name__)

# Get Products
@product_routes.route('/')
def get_products():
    products = Product.query.options(joinedload(Product.product_image)).all()
    #products = Product.query.join(ProductImage).all()

    result = {'products': []}
    for product in products:
        curr_product = product.to_dict()
        curr_product['images'] = [image.to_dict() for image in product.product_image]

        result['products'].append(curr_product)

    # return {'products': [image.to_dict() for product in products for image in product.product_image]}
    return result

# Get One Product
@product_routes.route('/<int:id>')
def get_product(id):
    product = Product.query.get(id)

    images = ProductImage.query.filter_by(product_id=id)

    reviews = Review.query.options(joinedload(Review.review_image))

    result = product.to_dict()
    result['images'] = images.to_dict()
    review['reviews'] = reviews.to_dict()

    for image in product.product_image:
        print(image)
    for review in product.review:
        print(review)
    return product[0].to_dict()
