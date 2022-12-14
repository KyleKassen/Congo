from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Product, ProductImage, Review, ReviewImage, User, db, Category
from sqlalchemy import func
from sqlalchemy.orm import joinedload, subqueryload, session
from ..forms.product_form import ProductForm
from ..forms.review_form import ReviewForm

product_routes = Blueprint('products', __name__)


@product_routes.route('/')
def get_products():
    """
    Get All Products
    """

    products = Product.query.options(joinedload(Product.product_image)).all()


    result = {'products': []}
    for product in products:
        curr_product = product.to_dict()
        curr_product['images'] = [image.to_dict()
                                  for image in product.product_image]


        rating = Review.query.with_entities(
            func.avg(Review.rating)).filter_by(product_id=product.id).first()
        review_count = Review.query.filter_by(product_id=product.id).count()
        # print(f'\n\n\n\n rating is {rating[0] is not None} {rating[0]}')
        if rating[0] is not None:
            rating = float(round(rating[0], 1))
        else:
            rating = None

        curr_product['rating'] = rating
        curr_product['reviewCount'] = review_count

        result['products'].append(curr_product)

    return result


@product_routes.route('/<int:id>')
def get_product(id):
    """
    Get One Product
    """

    product = Product.query.get(id)
    print(f'\n\n\n\n{product}')
    if product == None:
        return 'No Product Found'
    images = ProductImage.query.filter_by(product_id=id).all()
    user = User.query.filter_by(id=product.seller_id).first()

    rating = Review.query.with_entities(
        func.avg(Review.rating)).filter_by(product_id=id).first()
    review_count = Review.query.filter_by(product_id=id).count()
    # print(f'\n\n\n\n rating is {rating[0] is not None} {rating[0]}')
    if rating[0] is not None:
        rating = float(round(rating[0], 1))
    else:
        rating = None


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
            seller_id=seller_id,
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
        product_dict = product.to_dict()
        product_id = product_dict["id"]

        prodImage = ""

        if form.data['image']:
            prodImage = ProductImage(
            product_id=product_id,
            url=form.data['image'])
        else:
            prodImage = "https://thumbnail.imgbin.com/13/18/17/imgbin-coffee-tea-packaging-and-labeling-parcel-bag-design-G9E3ksvw2BMKK24u9zX6A61pT_t.jpg"


        db.session.add(prodImage)
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

    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    updated_product = Product.query.get(id)
    updated_prodImage = ProductImage.query.filter_by(product_id=id).first()


    if form.validate_on_submit():
        updated_product.title = form.data['title'],
        updated_product.description = form.data['description'],

        updated_product.price = form.data['price'],

        updated_prodImage.url = form.data['image']

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

    if (user_id != product.seller_id):
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


@product_routes.route('/lookup')
def implement_search():
    """
    Search for product
    """
    searchInput = request.args.get('search')
    cat = request.args.get('category')
    all_cat_products = None
    print('/n/n/ntestestestset')

    if (cat == "All"):
        all_cat_products = Product.query.options(joinedload(Product.product_image)).all()
    else:
        # all_cat_products = Product.query.filter(Product.categories.any(name=cat)).all()
        # all_cat_products = Product.query.options(joinedload(Product.categories)).filter(Category.name.startswith(cat)).all()
        # all_cat_products = Product.query.filter(Product.categories.any(name=f'{cat}%')).all()
        all_cat_products = db.session.query(Product).join(Product.categories).filter(Category.name.startswith(cat)).all()

    all_final_products = []

    print("all cat products")
    print(all_cat_products)

    if searchInput:
        for product in all_cat_products:
            if searchInput.lower() in product.title.lower():
                all_final_products.append(product)
    else:
        all_final_products = all_cat_products

    print("all final products")
    print(all_final_products)

    result = {'products': []}
    for product in all_final_products:
        curr_product = product.to_dict()
        curr_product['images'] = [image.to_dict()
                                  for image in product.product_image]
        print('TEEESETSTSETS')
        print(curr_product['images'])

        rating = Review.query.with_entities(
            func.avg(Review.rating)).filter_by(product_id=product.id).first()
        review_count = Review.query.filter_by(product_id=product.id).count()
        # print(f'\n\n\n\n rating is {rating[0] is not None} {rating[0]}')
        if rating[0] is not None:
            rating = float(round(rating[0], 1))
        else:
            rating = None

        curr_product['rating'] = rating
        curr_product['reviewCount'] = review_count

        result['products'].append(curr_product)

    return result


"""
Review product routes
"""


@product_routes.route('/<int:id>/reviews')
def get_reviews(id):
    """
    Get All Reviews for Product
    """

    reviews = Review.query.filter_by(product_id=id).options(
        joinedload(Review.review_image)).options(joinedload(Review.user)).all()

    result = {}
    result_reviews = []
    for review in reviews:
        current = review.to_dict()
        current['images'] = [image.to_dict() for image in review.review_image]
        current['user'] = review.user.to_dict()
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

    product_seller_id = Product.query.get(id).seller_id

    if (product_seller_id == user_id):
        return {
            "statusCode": 400,
            "message": "Current User owns the product"
        }

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    if form.validate_on_submit():
        review = Review(
            user_id=user_id,
            product_id=id,
            title=form.data['title'],
            review=form.data['review'],
            rating=form.data['rating']
        )

        db.session.add(review)
        db.session.commit()

        return review.to_dict()

    return {'errors': 'an error occured'}
