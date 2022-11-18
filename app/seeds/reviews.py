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
    r1i1 = ReviewImage(
        review_id = 1,
        url = 'https://cdn.vox-cdn.com/thumbor/ABLpGjYDSlGMYHtq6iBd-Xd3f8Y=/0x0:2040x1360/2400x1356/filters:focal(1040x848:1041x849)/cdn.vox-cdn.com/uploads/chorus_asset/file/22312371/DSCF3071_Edited.jpg'
    )
    r1i2 = ReviewImage(
        review_id = 1,
        url = 'https://i.pcmag.com/imagery/reviews/00NyOroFqZAG5RgEsI6qcXL-7..v1623784752.jpg'
    )
    r2i1 = ReviewImage(
        review_id = 2,
        url = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy5OWC3NQLKAXn8XWDesDIoWMOAVePG1IbKh9PkxF-rDHaR5u2zyATKFKJQonbTN5uCuI&usqp=CAU'
    )
    db.session.add_all([one, two])
    db.session.add_all([r1i1, r1i2, r2i1])

    r3 = Review(
        user_id = 3,
        product_id = 2,
        title = 'Wtf',
        review = 'Opened Christmas morning and looked like this.. thanks',
        rating = 1,
    )
    r3i1 = ReviewImage(
        review_id = 3,
        url = 'https://m.media-amazon.com/images/I/B1+8wZH7wnS.jpg'
    )
    r4 = Review(
        user_id = 3,
        product_id = 2,
        title = 'Nice TV for the price IF you get a working panel',
        review = "So mine is a bit of a mixed review. I ordered the 55S435. I was upgrading from a previous 1080p 43” 3-series (which still works and looks great to me). Upon arrival I thought the tv looked great - I liked the colors and resolution. I also honestly couldn't tell a difference between it and the 5 series (which I had gone to see in store before I ordered). I only stream shows, I don't game, so my bar is probably lower. However, after a couple hours of watching I started getting these flashing rectangles at the top of the screen. I called amazon and they arranged for a replacement. Unfortunately, the replacement arrived broken due to shipping. Sooo I called Amazon again and they arranged for another replacement. That one arrived yesterday; colors and resolution looked good UNTIL after a couple hours it started to do the flashing rectangle thing again at the top of the screen (see pics and video). So at this point I'm returning it and going to buy another brand in store. Amazon customer service is great, however, and they made returns and replacements no hassle. I wish it had worked out because I loved my old TCL and Roku platform (and in my opinion this TV looks great for the price) but unfortunately looks like the panel lottery is not in my favor this time around.",
        rating = 3,
    )
    r4i1 = ReviewImage(
        review_id = 4,
        url = 'https://m.media-amazon.com/images/I/A1b9B0wzJyL.jpg'
    )

    db.session.add_all([r3, r4])
    db.session.add_all([r3i1, r4i1])

    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE')
    db.session.commit()
