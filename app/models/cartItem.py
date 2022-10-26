from .db import db

class CartItem(db.Model):
    __tablename__ = 'cartItems'

    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    quantity = db.Column(db.Integer, nullable=False)

    buyer = db.relationship('User', back_populates='cart_item')
    product = db.relationship('Product', back_populates='cart_item')

    def to_dict(self):
        return {
            'id': self.id,
            'buyerId': self.buyer_id,
            'productId': self.product_id,
            'quantity': self.quantity,
        }
