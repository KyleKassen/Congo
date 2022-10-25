from app.models import db, PaymentMethod

def seed_paymentMethods():
    one = PaymentMethod(
        user_id = 4,
        card_number = '0000111122223333',
        card_holder = 'Kyle Kassen',
        card_exp = 1212,
        security_code = 123,
        default_card = True
    )

    db.session.add(one)
    db.session.commit()

def undo_paymentMethods():
    db.session.execute('TRUNCATE paymentMethods RESTART IDENTITY CASCADE')
    db.session.commit()
