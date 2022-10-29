from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, ShippingAddress, db
from ..forms.address_form import AddressForm

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


@user_routes.route('/api/users/addresses', methods=['POST'])
@login_required
def create_address(id):
    """
    Create a Address
    """
    user = current_user.to_dict()
    user_id = user['id']

    form = AddressForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data)

    if form.validate_on_submit():
        address = ShippingAddress(
            user_id=user_id,
            address=form.data['address'],
            city=form.data['city'],
            state=form.data['state'],
            zipcode=form.data['zipcode']
        )

        db.session.add(address)
        db.session.commit()

        return address.to_dict()

    return {'errors': 'an error occured'}


@user_routes.route('/addresses/<int:id>', methods=['PUT'])
@login_required
def update_review(id):
    """
    Update a address
    """

    update_address = ShippingAddress.query.get(id)
    user = current_user.to_dict()
    user_id = user['id']

    if (user_id != update_address.user_id):
        return {
            "statusCode": 400,
            "message": "Not the correct user"
        }

    form = AddressForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data)

    if form.validate_on_submit():
        update_address.address = form.data['address'],
        update_address.city = form.data['city'],
        update_address.state = form.data['state']
        update_address.zipcode = form.data['zipcode']

        db.session.commit()

        return update_address.to_dict()

    return {'errors': 'form was not validated'}, 400
