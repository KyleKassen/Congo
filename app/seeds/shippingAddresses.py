from app.models import db, ShippingAddress

def seed_shippingAddresses():
    one = ShippingAddress(
        user_id = 4,
        address = '123 barracks way',
        city = 'College Station',
        state = 'TX',
        zipcode = 77845
    )

    db.session.add(one)
    db.session.commit()

def undo_shippingAddresses():
    db.session.execute('TRUNCATE shippingAddresses RESTART IDENTITY CASCADE')
    db.session.commit()
