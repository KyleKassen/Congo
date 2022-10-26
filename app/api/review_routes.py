from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Product, ProductImage, Review, ReviewImage, User, db
from sqlalchemy import func
from sqlalchemy.orm import joinedload, subqueryload
from ..forms.review_form import ReviewForm

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/<int:id>')
@login_required
def update_review(id):
    """
    Update a review
    """

    update_review = Review.query.get(id)
    user = current_user.to_dict()
    owner_id = user['id']

    if (owner_id != form.data['user_id']):
        return {
            "statusCode": 400,
            "message": "Not the correct user"
        }

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        update_review.title = form.data['title'],
        update_review.review = form.data['review'],
        update_review.date = form.data['date'],
        update_review.rating = form.data['rating'],
        update_review.number_helpful = form.data['number_helpful'],

        db.session.commit()

        return update_review.to_dict()

    return {'errors': 'form was not validated'}
