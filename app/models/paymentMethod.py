from .db import db

class PaymentMethod(db.Model):
    __tablename__ = 'paymentMethods'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    card_number = db.Column(db.Integer, nullable=False)
    card_holder = db.Column(db.String, nullable=False)
    card_exp = db.Column(db.Integer, nullable=False)
    security_code = db.Column(db.Integer, nullable=False)
    default_card = db.Column(db.Boolean, default=True)

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
