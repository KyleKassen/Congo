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

    p2 = Product(
        seller_id=2,
        title = 'TCL 55" Class 4-Series 4K UHD HDR Smart Roku TV - 55S435, 2021 Model',
        description ='The 4-Series Roku TV delivers stunning 4K picture quality with four times the resolution of Full HD for enhanced clarity and detail, as well as endless entertainment with thousands of streaming channels. High dynamic range (HDR) technology delivers bright and accurate colors for a lifelike viewing experience. In addition, your favorite HD shows, movies, and sporting events are upscaled to near Ultra HD resolution with 4K Upscaling. The simple, personalized home screen allows seamless access to thousands of streaming channels, plus your cable box, Blu-ray player, gaming console, and other devices without flipping through inputs or complicated menus. The super-simple remote—with about half the number of buttons on a traditional TV remote—puts you in control of your favorite entertainment.',
        fulfilled_by = 'Amazon.com',
        sold_by = 'Amazon.com',
        quantity = 100,
        price = 599.99,
        sale_price = 319.99,
        prime = True
    )

    p3 = Product(
        seller_id=2,
        title = 'TCL 32" Class 3-Series HD 720p LED Smart Roku TV - 32S355',
        description ="The TCL 3-Series is the simply smart way to enjoy endless entertainment. Enjoy over half a million movies and TV episodes available to stream plus sports, news, music, kids and family, food, science and tech, fitness, foreign language and so much more. Start streaming free TV right from your home screen or browse 250+ free live channels with the Live TV Channel Guide to find what to watch next. Your favorite broadcast TV, streaming channels, gaming console and other devices are front-and-center within a simple, customizable home screen. There's no more flipping through inputs or wading through complicated menus. The super-simple remote—with about half the number of buttons on a traditional TV remote—puts you in control of your favorite entertainment and includes one-touch shortcuts to popular channels like Netflix.",
        fulfilled_by = 'Amazon.com',
        sold_by = 'Amazon.com',
        quantity = 100,
        price = 229.99,
        sale_price = 139.99,
        prime = True
    )
    p4 = Product(
        seller_id=2,
        title = 'Mini PC Windows 11 Pro, 8GB DDR4 128GB SSD Intel Celeron J4125 Mini Desktop Computer, Support 2.5-inch SSD, 2.4G+5.0G WiFi, 4K HDMI x2, Gigabit Ethernet, BT 4.2, Support Windows 10 Pro Micro PC',
        description ="The TCL 3-Series is the simply smart way to enjoy endless entertainment. Enjoy over half a million movies and TV episodes available to stream plus sports, news, music, kids and family, food, science and tech, fitness, foreign language and so much more. Start streaming free TV right from your home screen or browse 250+ free live channels with the Live TV Channel Guide to find what to watch next. Your favorite broadcast TV, streaming channels, gaming console and other devices are front-and-center within a simple, customizable home screen. There's no more flipping through inputs or wading through complicated menus. The super-simple remote—with about half the number of buttons on a traditional TV remote—puts you in control of your favorite entertainment and includes one-touch shortcuts to popular channels like Netflix.",
        fulfilled_by = 'Amazon.com',
        sold_by = 'Trend-KAMRUI',
        quantity = 10,
        price = 265.95,
        sale_price = 189.95,
        prime = True
    )

    for cat in categories:
        curr_cat = Category(name=cat)
        # curr_cat.products.append(fire_stick)
        # db.session.add(Category(name=cat))
        if cat == 'Electronics' or cat == 'Movies & TV':
            p2.categories.append(curr_cat)
            p3.categories.append(curr_cat)

        fire_stick.categories.append(curr_cat)
    db.session.add_all([fire_stick, p2, p3, p4])
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
    pm3 = ProductImage(
        product_id=2,
        url='https://m.media-amazon.com/images/I/71wJCiFPrfL._AC_SL1500_.jpg'
    )
    pm6 = ProductImage(
        product_id=2,
        url='https://m.media-amazon.com/images/I/81BBgZ+Y0xL._AC_SL1500_.jpg'
    )
    pm7 = ProductImage(
        product_id=2,
        url='https://m.media-amazon.com/images/I/81rbnWZRa9L._AC_SL1500_.jpg'
    )
    pm8 = ProductImage(
        product_id=2,
        url='https://m.media-amazon.com/images/I/71ezFcQzdWL._AC_SL1500_.jpg'
    )
    pm4 = ProductImage(
        product_id=3,
        url='https://m.media-amazon.com/images/I/71yi46Ali0L._AC_SL1500_.jpg'
    )
    pm5 = ProductImage(
        product_id=4,
        url='https://m.media-amazon.com/images/I/71BuQGT+eXL._AC_SL1500_.jpg'
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
    db.session.add_all([onepm, twopm, pm3, pm4, pm5, pm6, pm7, pm8])
    db.session.commit()
    db.session.add(q1)
    db.session.add(a1)
    db.session.commit()


def undo_products():
    db.session.execute('TRUNCATE products RESTART IDENTITY CASCADE')
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE')
    db.session.commit()
