from .db import db

class Question(db.Model):
    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    question = db.Column(db.String, nullable=False)
    votes = db.Column(db.Integer, default=0)

    user = db.relationship('User', back_populates='question')
    product = db.relationship('Product', back_populates='question')
    answer = db.relationship('Answer', back_populates='question')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'productId': self.product_id,
            'question': self.question,
            'votes': self.votes
        }

class Answer(db.Model):
    __tablename__ = 'answers'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'))
    answer = db.Column(db.String, nullable=False)

    question = db.relationship('Question', back_populates='answer')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'questionId': self.question_id,
            'answer': self.answer
        }
