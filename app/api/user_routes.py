from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, ShippingAddress, PaymentMethod, db
from ..forms.address_form import AddressForm
from ..forms.payment_form import PaymentForm

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


@user_routes.route('/addresses', methods=['POST'])
@login_required
def create_address():
    """
    Create a Address
    """
    user = current_user.to_dict()
    user_id = user['id']

    form = AddressForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("\n\n\n\nform data",form.data)

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
def update_address(id):
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


@user_routes.route('/addresses/<int:id>', methods=['DELETE'])
@login_required
def delete_address(id):
    """
    Delete a address
    """
    address = ShippingAddress.query.get(id)

    user = current_user.to_dict()
    user_id = user['id']

    if (user_id != address.user_id):
        return {
            "statusCode": 400,
            "message": "Not the correct user"
        }

    db.session.delete(address)
    db.session.commit()

    return {
        "statusCode": 200,
        "message": "successfully deleted"
    }



"""
Payment Method Routes
"""
@user_routes.route('/<int:id>/payments')
@login_required
def get_payments(id):

    print('\n\n\n\n\n\n\n', current_user.to_dict())
    user = current_user.to_dict()
    user_id = user['id']

    if (user_id != id):
        return {
            "statusCode": 400,
            "message": "Not the correct user"
        }

    payments = PaymentMethod.query.filter_by(user_id = id).all()

    return {
        'payments': [payment.to_dict() for payment in payments]
    }


@user_routes.route('/payments', methods=['POST'])
@login_required
def create_payment():
    """
    Create a Payment
    """
    user = current_user.to_dict()
    user_id = user['id']

    form = PaymentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("\n\n\n\nform data",form.data)

    if form.validate_on_submit():
        payment = PaymentMethod(
            user_id=user_id,
            card_number=form.data['card_number'],
            card_holder=form.data['card_holder'],
            card_exp=form.data['card_exp'],
            security_code=form.data['security_code']
        )

        db.session.add(payment)
        db.session.commit()

        return payment.to_dict()

    return {'errors': 'an error occured'}


@user_routes.route('/payments/<int:id>', methods=['PUT'])
@login_required
def update_payment(id):
    """
    Update a payment
    """

    update_payment = PaymentMethod.query.get(id)
    user = current_user.to_dict()
    user_id = user['id']

    if (user_id != update_payment.user_id):
        return {
            "statusCode": 400,
            "message": "Not the correct user"
        }

    form = PaymentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print(form.data)

    if form.validate_on_submit():
        update_payment.card_number = form.data['card_number'],
        update_payment.card_holder = form.data['card_holder'],
        update_payment.card_exp = form.data['card_exp']
        update_payment.security_code = form.data['security_code']

        db.session.commit()

        return update_payment.to_dict()

    return {'errors': 'form was not validated'}, 400


@user_routes.route('/payments/<int:id>', methods=['DELETE'])
@login_required
def delete_payment(id):
    """
    Delete a Payment Method
    """
    payment = PaymentMethod.query.get(id)

    user = current_user.to_dict()
    user_id = user['id']

    if (user_id != payment.user_id):
        return {
            "statusCode": 400,
            "message": "Not the correct user"
        }

    db.session.delete(payment)
    db.session.commit()

    return {
        "statusCode": 200,
        "message": "successfully deleted"
    }
