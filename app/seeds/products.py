from app.models import db, Product

def seed_products():
    fire_stick = Product(
        seller_id = 1, title = 'Fire TV Stick 4K, brilliant 4K streaming quality, TV and smart home controls, free and live TV', description = 'Cinematic experience - Watch in vibrant 4K Ultra HD with support for Dolby Vision, HDR, and HDR10 Home theater audio with Dolby Atmos - Feel scenes come to life with support for immersive Dolby Atmos audio on select titles with compatible home audio systems.Endless entertainment - Stream more than 1 million movies and TV episodes from Netflix, Prime Video, Disney+, Peacock, and more, plus listen to millions of songs. Subscription fees may apply. Live and free TV - Watch live TV, news, and sports with subscriptions to SLING TV, YouTube TV, and others. Stream for free with Pluto TV, Freevee, YouTube and more.Alexa Voice Remote - Search and launch content with your voice. Get to favorite apps quickly with preset buttons. Control power and volume with one remote. Control your smart home - Ask Alexa to check weather, dim the lights, view live camera feeds, stream music and more.',
        fulfilled_by = 'Amazon.com',
        sold_by = 'Amazon.com',
        quantity = 5000,
        price = 49.99,
        prime = True
    )

    db.session.add(fire_stick)
    db.session.commit()

def undo_products():
    db.session.execute('TRUNCATE products RESTART IDENTITY CASCADE')
    db.session.commit()
