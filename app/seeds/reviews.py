from app.models import db, Review

def seed_reviews():
    one = Review(
        user_id = 2,
        product_id = 1,
        title = 'Cool Product',
        review = 'I enjoyed using this product, great!',
        date = 'Oct 9th, 1999',
        rating = 5,
    )
    two = Review(
        user_id = 3,
        product_id = 1,
        title = 'Bad Product',
        review = 'I hate this product',
        date = 'Oct 5th, 1999',
        rating = 2,
    )

    db.session.add(one)
    db.session.add(two)
    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE')
    db.session.commit()
