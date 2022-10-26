from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    product_id = IntegerField('Product Id', validators=[DataRequired()])
    title = StringField('Title', validators=[DataRequired()])
    review = StringField('Review', validators=[DataRequired()])
    rating = IntegerField('Rating', validators=[DataRequired()])
    date = StringField('Date')
    number_helpful = IntegerField('Number of Upvotes', validators=[DataRequired()])

    submit = SubmitField('Submit')
