from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Product, ProductImage, Review, ReviewImage, User, db
from sqlalchemy import func
from sqlalchemy.orm import joinedload, subqueryload
from ..forms.review_form import ReviewForm
from app.s3_functions import upload_file_to_s3, allowed_file, get_unique_filename, delete_file_from_s3
from werkzeug.datastructures import CombinedMultiDict
from werkzeug.utils import secure_filename
import json

review_routes = Blueprint('reviews', __name__)


@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_review(id):
    """
    Update a review
    """

    update_review = Review.query.get(id)
    user = current_user.to_dict()
    user_id = user['id']

    if (user_id != update_review.user_id):
        return {
            "statusCode": 400,
            "message": "Not the correct user"
        }

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data)

    if form.validate_on_submit():
        update_review.title = form.data['title'],
        update_review.review = form.data['review'],
        update_review.rating = form.data['rating']

        db.session.commit()

        return update_review.to_dict()

    return {'errors': 'form was not validated'}, 400

@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    """
    Delete a review
    """
    review = Review.query.filter_by(id=id).options(joinedload(Review.review_image)).all()[0]

    print("\n\n\n", review.review_image)

    for image in review.review_image:
        delete = delete_file_from_s3(image.url)

    user = current_user.to_dict()
    user_id = user['id']

    if (user_id != review.user_id):
        return {
            "statusCode": 400,
            "message": "Not the correct user"
        }

    db.session.delete(review)
    db.session.commit()

    return {
        "statusCode": 200,
        "message": "successfully deleted"
    }

@review_routes.route('/<int:id>/images', methods=['POST'])
@login_required
def add_review_imgages(id):
    """
    Add Images to Review
    """
    user = current_user.to_dict()
    user_id = user['id']

    urlsObj = request.json
    print("\n\n\nrequest.json", urlsObj)
    createImages = []

    for url in urlsObj['urls']:
        new_image = ReviewImage(review_id=id, url=url)
        createImages.append(new_image.to_dict())
        db.session.add(new_image)

    print(createImages)
    createImagesJson = json.dumps(createImages)
    db.session.commit()
    return {"url": createImagesJson}

@review_routes.route('/images', methods=['POST'])
@login_required
def add_img_to_s3():
    """
    Add Images to S3 bucket
    """
    # user = current_user.to_dict()
    # user_id = user['id']

    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400


    image.filename = get_unique_filename(image.filename)
    print("\n\n\n\n", image.filename)
    # print("\n\n\n\n", image.Key)


    upload = upload_file_to_s3(image)
    print("\n\n\n\n", upload)
    print("\n\n\n\n", upload["url"])

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    # new_image = ReviewImage(review_id=id, url=url)
    # db.session.add(new_image)
    # db.session.commit()
    return {"url": url}


@review_routes.route('/images', methods=['DELETE'])
@login_required
def delete_review_img():
    """
    Delete a review image
    """
    urlObj = request.json
    print("\n\n\nrequest.json", urlObj)

    delete = delete_file_from_s3(urlObj['url'])

    print(f'delete response from s3 helper function {delete}')

    if not delete:
        return {"response": "Delete was successful"}
