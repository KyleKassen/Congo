from flask_wtf import FlaskForm
from wtforms import SubmitField, IntegerField
from wtforms.validators import DataRequired

class CartForm(FlaskForm):
    quantity = IntegerField("Quantity")

    submit = SubmitField('Submit')
