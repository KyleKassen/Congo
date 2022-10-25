from .db import db
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    title = db.Column(db.String(255), nullable=False)
    review = db.Column(db.String(5000), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    number_helpful = db.Column(db.Integer, nullable=False, default=0)
    created_at = db.Column(db.String, default=datetime.now)
    updated_at = db.Column(db.String, default=datetime.now, onupdate=datetime.now)

    user = db.relationship('User', back_populates='review')
    product = db.relationship('Product', back_populates='review')



    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'productId': self.product_id,
            'title': self.title,
            'review': self.review,
            'rating': self.rating,
            'numberHelpful': self.number_helpful,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
        }
