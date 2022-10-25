from app.models import db, Review, ReviewImage

def seed_reviews():
    one = Review(
        user_id = 2,
        product_id = 1,
        title = 'Cool Product',
        review = 'I enjoyed using this product, great!',
        rating = 5,
    )
    two = Review(
        user_id = 3,
        product_id = 1,
        title = 'Bad Product',
        review = 'I hate this product',
        rating = 2,
    )

    oneri = ReviewImage(
        review_id = 1,
        url = 'https://cdn.vox-cdn.com/thumbor/ABLpGjYDSlGMYHtq6iBd-Xd3f8Y=/0x0:2040x1360/2400x1356/filters:focal(1040x848:1041x849)/cdn.vox-cdn.com/uploads/chorus_asset/file/22312371/DSCF3071_Edited.jpg'
    )
    db.session.add_all([one, two])
    db.session.add(oneri)
    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE')
    db.session.commit()
