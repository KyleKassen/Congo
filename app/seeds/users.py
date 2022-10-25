from app.models import db, User, PaymentMethod, ShippingAddress


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        firstname = 'Demo', lastname = 'User', username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        firstname = 'Marnie', lastname = 'User', username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        firstname = 'Bobbie', lastname = 'User', username='bobbie', email='bobbie@aa.io', password='password')
    kyle = User(
        firstname = 'Kyle', lastname = 'Kassen', username='kassen', email='kyle@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(kyle)

    pm1 = PaymentMethod(
        user_id = 4,
        card_number = '0000111122223333',
        card_holder = 'Kyle Kassen',
        card_exp = 1212,
        security_code = 123,
        default_card = True
    )

    sa1 = ShippingAddress(
        user_id = 4,
        address = '123 barracks way',
        city = 'College Station',
        state = 'TX',
        zipcode = 77845
    )
    db.session.add_all([pm1,sa1])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
