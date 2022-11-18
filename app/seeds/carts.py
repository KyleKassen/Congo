from app.models import db, CartItem

def seed_cartItems():
    item1 = CartItem(
        buyer_id = 1,
        product_id = 1,
        quantity = 2
    )
    item2 = CartItem(
        buyer_id = 1,
        product_id = 2,
        quantity = 1
    )
    db.session.add_all([item1, item2])
    db.session.commit()

def undo_cartItems():
    db.session.execute('TRUNCATE cartItems RESTART IDENTITY CASCADE')
    db.session.commit()
