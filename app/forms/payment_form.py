from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired

class PaymentForm(FlaskForm):
    card_number = StringField('Card Number', validators=[DataRequired()])
    card_holder = StringField('Card Holder', validators=[DataRequired()])
    card_exp = IntegerField('Card Expiration', validators=[DataRequired()])
    security_code = IntegerField('Security Code', validators=[DataRequired()])

    submit = SubmitField('Submit')
