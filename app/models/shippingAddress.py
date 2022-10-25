from .db import db

class ShippingAddress(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    zipcode = db.Column(db.Integer, nullable=False)

    user = db.relationship('User', back_populates='address')



    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'address': self.address,
            'city': self.city,
            'state': self.state,
        }
