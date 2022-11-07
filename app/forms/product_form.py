from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, FloatField, BooleanField, IntegerField
from wtforms.validators import DataRequired

class ProductForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    sold_by = StringField('Sold By')
    fulfilled_by = StringField('Fulfilled By')
    quantity = IntegerField('Quantity')
    price = FloatField('Price', validators=[DataRequired()])
    sale_price = FloatField('Sale Price')
    shipping_price = FloatField('Shipping Price')
    image = StringField('Image')
    prime = BooleanField('Prime')

    submit = SubmitField('Submit')
