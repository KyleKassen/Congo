from .db import db

categories_products = db.Table(
    'categories_products',
    db.Model.metadata,
    db.Column('product_id', db.Integer, db.ForeignKey(
        'products.id'), primary_key=True),
    db.Column('category_id', db.Integer, db.ForeignKey(
        'categories.id'), primary_key=True)
)


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
    review = db.relationship('Review', back_populates='product')
    product_image = db.relationship('ProductImage', back_populates='product')

    categories = db.relationship(
        'Category',
        secondary=categories_products,
        back_populates='products')

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


class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    products = db.relationship(
        'Product',
        secondary=categories_products,
        back_populates='categories')




class ProductImage(db.Model):
    __tablename__ = 'productImages'

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    url = db.Column(db.Integer, nullable=False)
    preview = db.Column(db.Boolean, default=False)

    product = db.relationship('Product', back_populates='product_image')

    def to_dict(self):
        return {
            'id': self.id,
            'productId': self.product_id,
            'url': self.url,
            'preview': self.preview,
        }
