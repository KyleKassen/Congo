from app.models import db, Product, Category, ProductImage, Question, Answer

categories = ['Alex Skills', 'Amazon Devices', 'Amazon Explore', 'Amazon Pharmacy', 'Amazon Warehouse', 'Appliances', 'Apps & Games', 'Arts, Crafts & Sewing', 'Audible Books & Originals', 'Automotive Parts & Accessories', 'Baby', 'Beauty & Personal Care', 'Books', 'CDs & Vinyl', 'Cell Phones & Accessories', 'Clothing, Shoes & Jewely', 'Collectibles & Fine Art', 'Computes', 'Credit and Payment Cards', 'Digital Educational Resources', 'Digital Music', 'Electronics', 'Garden & Outdoor', 'Gift Cards', 'Grocery & Gourmet Food', 'Handmade', 'Health, Household & Babe Care', 'Home & Business Services', 'Home & Kitchen', 'Industrial & Scientific', 'Just for Prime', 'Kindle Store', 'Luggage & Travel Gear', 'Luxury Store', 'Magazine Subscriptions', 'Movies & TV', 'Musical Instruments', 'Office Products', 'Online Learning', 'Pet Supplies', 'Premium Beauty', 'Prime Video', 'Smart Home', 'Software', 'Sports & Outdoors', 'Subscription Boxes', 'Tools & Home Improvement', 'Toys & Games', 'Under $10', 'Video Games']

def seed_products():
    # Add all categories
    fire_stick = Product(
        seller_id = 1,
        title = 'Fire TV Stick 4K, brilliant 4K streaming quality, TV and smart home controls, free and live TV',
        description = 'Cinematic experience - Watch in vibrant 4K Ultra HD with support for Dolby Vision, HDR, and HDR10 Home theater audio with Dolby Atmos - Feel scenes come to life with support for immersive Dolby Atmos audio on select titles with compatible home audio systems.Endless entertainment - Stream more than 1 million movies and TV episodes from Netflix, Prime Video, Disney+, Peacock, and more, plus listen to millions of songs. Subscription fees may apply. Live and free TV - Watch live TV, news, and sports with subscriptions to SLING TV, YouTube TV, and others. Stream for free with Pluto TV, Freevee, YouTube and more.Alexa Voice Remote - Search and launch content with your voice. Get to favorite apps quickly with preset buttons. Control power and volume with one remote. Control your smart home - Ask Alexa to check weather, dim the lights, view live camera feeds, stream music and more.',
        fulfilled_by = 'Amazon.com',
        sold_by = 'Amazon.com',
        quantity = 5000,
        price = 49.99,
        prime = True
    )

    for cat in categories:
        curr_cat = Category(name=cat)
        # curr_cat.products.append(fire_stick)
        # db.session.add(Category(name=cat))
        fire_stick.categories.append(curr_cat)
    db.session.add(fire_stick)
    db.session.commit()


    onepm = ProductImage(
        product_id=1,
        url='https://m.media-amazon.com/images/I/61rQC6AM-6L._AC_SL1000_.jpg',
        preview=True
    )
    twopm = ProductImage(
        product_id=1,
        url='https://m.media-amazon.com/images/I/411y5UdVmvL._AC_SL1000_.jpg'
    )

    q1 = Question(
        product_id=1,
        user_id=4,
        question='Is this product any good',
    )

    a1 = Answer(
        question_id=1,
        user_id=3,
        answer='Yes, this product is good'
    )


    # fire_stick.categories.append
    # db.session.add(fire_stick)
    db.session.add_all([onepm, twopm])
    db.session.commit()
    db.session.add(q1)
    db.session.add(a1)
    db.session.commit()


def undo_products():
    db.session.execute('TRUNCATE products RESTART IDENTITY CASCADE')
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE')
    db.session.commit()
