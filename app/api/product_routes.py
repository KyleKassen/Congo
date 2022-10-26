from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Product, ProductImage, Review, ReviewImage, User, db
from sqlalchemy import func
from sqlalchemy.orm import joinedload, subqueryload
from ..forms.product_form import ProductForm
from ..forms.review_form import ReviewForm

product_routes = Blueprint('products', __name__)


@product_routes.route('/')
def get_products():
    """
    Get All Products
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


@product_routes.route('/<int:id>')
def get_product(id):
    """
    Get One Product
    """

    product = Product.query.get(id)
    images = ProductImage.query.filter_by(product_id=id).all()
    user = User.query.filter_by(id=product.seller_id).first()

    rating = Review.query.with_entities(
        func.avg(Review.rating)).filter_by(product_id=id).first()
    review_count = Review.query.count()
    rating = float(round(rating[0], 1))

    # reviews = Review.query.filter_by(product_id=id).options(joinedload(Review.review_image)).all()

    # result_reviews = []
    # for review in reviews:
    #     current = review.to_dict()
    #     current['images'] = [image.to_dict() for image in review.review_image]
    #     result_reviews.append(current)
    # result['reviews'] = result_reviews

    result = product.to_dict()
    result['images'] = [image.to_dict() for image in images]
    result['seller'] = user.to_dict()
    result['rating'] = rating
    result['reviewCount'] = review_count

    return result


@product_routes.route('/', methods=['POST'])
@login_required
def create_product():
    """
    Create a Product
    """
    user = current_user.to_dict()
    seller_id = user['id']

    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        product = Product(
            seller_id,
            title=form.data['title'],
            description=form.data['description'],
            sold_by=form.data['sold_by'],
            fulfilled_by=form.data['fulfilled_by'],
            quantity=form.data['quantity'],
            price=form.data['price'],
            sale_price=form.data['sale_price'],
            shipping_price=form.data['shipping_price'],
            prime=form.data['prime']
        )
        db.session.add(product)
        db.session.commit()

        return product.to_dict()

    return {'errors': 'an error occured'}


@product_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_product(id):
    """
    Update a Product
    """
    user = current_user.to_dict()
    owner_id = user['id']

    if (owner_id != form.data['seller_id']):
        return {
            "statusCode": 400,
            "message": "Not the correct user"
        }

    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    updated_product = Product.query.get(id)

    if form.validate_on_submit():
        updated_product.title = form.data['title'],
        updated_product.description = form.data['description'],
        updated_product.sold_by = form.data['sold_by'],
        updated_product.fulfilled_by = form.data['fulfilled_by'],
        updated_product.quantity = form.data['quantity'],
        updated_product.price = form.data['price'],
        updated_product.sale_price = form.data['sale_price'],
        updated_product.shipping_price = form.data['shipping_price'],
        updated_product.prime = form.data['prime']

        db.session.commit()

        return updated_product.to_dict()

    return {'errors': 'form was not validated'}


@product_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_product(id):
    """
    Delete a Product
    """

    user = current_user.to_dict()
    user_id = user['id']
    product = Product.query.get(id)

    if (user_id != product['seller_id']):
        return {
            "statusCode": 400,
            "message": "Not the correct user"
        }

    db.session.delete(product)
    db.session.commit()

    return {
        "statusCode": 200,
        "message": "successfully deleted"
    }


"""
Review product routes
"""


@product_routes.route('/<int:id>/reviews')
def get_reviews(id):
    """
    Get All Reviews for Product
    """

    reviews = Review.query.filter_by(product_id=id).options(
        joinedload(Review.review_image)).all()

    result = {}
    result_reviews = []
    for review in reviews:
        current = review.to_dict()
        current['images'] = [image.to_dict() for image in review.review_image]
        result_reviews.append(current)
    result['reviews'] = result_reviews

    return result


@product_routes.route('/<int:id>/reviews', methods=['POST'])
@login_required
def create_review(id):
    """
    Create a Review
    """
    user = current_user.to_dict()
    user_id = user['id']

    if (id == user_id):
        return {
            "statusCode": 400,
            "message": "Current User owns the product"
        }

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review = Review(
            user_id,
            product_id=id,
            title=form.data['title'],
            review=form.data['review'],
            rating=form.data['quantity'],
        )

        db.session.add(review)
        db.session.commit()

        return review.to_dict()

    return {'errors': 'an error occured'}
