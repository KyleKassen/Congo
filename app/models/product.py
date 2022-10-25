from .db import db

class Product(db.Model):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    seller_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String, nullable=False)
    sold_by = db.Column(db.String, nullable=False)
    fulfilled_by = db.Column(db.String, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    sale_price = db.Column(db.Float)
    shipping_price = db.Column(db.Float)
    prime = db.Column(db.Boolean, nullable=False)

    seller = db.relationship('User', back_populates='product')



    def to_dict(self):
        return {
            'id': self.id,
            'sellerId': self.seller_id,
            'title': self.title,
            'description': self.description,
            'fulfilledBy': self.fulfilled_by,
            'quantity': self.quantity,
            'price': self.price,
            'salePrice': self.sale_price,
            'shippingPrice': self.shipping_price,
            'prime': self.prime
        }
