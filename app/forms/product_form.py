from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, FloatField, BooleanField, IntegerField
from wtforms.validators import DataRequired

class ProductForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    sold_by = StringField('Sold By', validators=[DataRequired()])
    fulfilled_by = StringField('Fulfilled By', validators=[DataRequired()])
    quantity = IntegerField('Quantity', validators=[DataRequired()])
    price = FloatField('Price', validators=[DataRequired()])
    sale_price = FloatField('Sale Price', validators=[DataRequired()])
    shipping_Price = FloatField('Shipping Price', validators=[DataRequired()])
    prime = BooleanField('Prime', validators=[DataRequired()])

    submit = SubmitField('Submit')
