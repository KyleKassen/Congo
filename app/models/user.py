from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(60), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_picture = db.Column(db.String, default="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png")

    product = db.relationship('Product', back_populates='seller')
    review = db.relationship('Review', back_populates='user')
    address = db.relationship('ShippingAddress', back_populates='user')
    payment_method = db.relationship('PaymentMethod', back_populates='user')
    question = db.relationship('Question', back_populates='user')
    cart_item = db.relationship('CartItem', back_populates='buyer')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'picture': self.profile_picture
        }

class ShippingAddress(db.Model):
    __tablename__ = 'shippingAddresses'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    zipcode = db.Column(db.Integer, nullable=False)
    default_address = db.Column(db.Boolean, default=False)

    user = db.relationship('User', back_populates='address')


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'zipcode': self.zipcode,
            'defaultAddress': self.default_address
        }


class PaymentMethod(db.Model):
    __tablename__ = 'paymentMethods'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    card_number = db.Column(db.String(25), nullable=False)
    card_holder = db.Column(db.String, nullable=False)
    card_exp = db.Column(db.Integer, nullable=False)
    security_code = db.Column(db.Integer, nullable=False)
    default_card = db.Column(db.Boolean, default=False)

    user = db.relationship('User', back_populates='payment_method')


    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'cardNumber': self.card_number,
            'cardHolder': self.card_holder,
            'cardExp': self.card_exp,
            'securityCode': self.security_code,
            'defaultCard': self.default_card
        }
