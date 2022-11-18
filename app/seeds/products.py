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
        description ="KAMRUI mini computer is smaller than a magazine whose size is only 5.1*1.8*5.1. It can be put in a bag and taken away at any time. You can work and play wherever you go.Mini pc windows 11 pro makes the work more efficient, makes your office more beautiful, and its simple to use, beautiful and generous, and does not take up space. We offer 7*24H Customer Service, lifetime technical support, 1 year quality after-service. KAMRUI Mini computer supports 2.4G+5.8G dual band WiF and this micro pc supports Bluetooth 4.2 which could be connected with your multimedia devices, mouse, acoustics or headset.Mini computer support connecting multiple devices and can work with server, monitoring equipment, office equipment, monitor, projector, TV and so on. KAMRUI pc desktop comes with 2x HDMI and VGA port, Support 4K@60Hz(3280 x 2160), Good for home entertainment, movie, video conference, feel free to enjoy all your favorite movies with your family, bringing you the best playback experience. You can also easily connect triple monitors at the same time, and perform different tasks on the triple screens, increasing your productivity. KAMRUI micro computer with high-speed 8GB(2400MHZ) DDR4, Built-in 128GB M.2 2242 SSD. you can expand the storage with M.2 SATA SSD 2242 upgrade storage to 2TB (no included) . You can also add a 2.5 SSD (no included) to expand the memory wonderful safety data bank and larger storage space for you. Easily deal with simultaneous multitasking, entertainment, audio and video, office, diversified modern micro computers.",
        fulfilled_by = 'Amazon.com',
        sold_by = 'Trend-KAMRUI',
        quantity = 10,
        price = 265.95,
        sale_price = 189.95,
        prime = True
    )

    p5 = Product(
        seller_id=2,
        title = 'Pre Workout Powder; Pre-KAGED Elite Preworkout for Men & Women, High Stimulant for Workout Energy, Focus & Pumps; Premium L-Citrulline, Beta Alanine, Creatine, & 388mg of Caffeine, Glacier Grape',
        description ="PRE-KAGED Elite was designed for athletes who want to take their performance to the next level. With 20 premium ingredients, including 9 patented ingredients, this all-in-one pre-workout powder will help you achieve heightened energy, sharp mental focus, and bigger pumps than ever before. It's so powerful, you'll never use another pre-workout product again. PurCaf organic caffeine from non-GMO green coffee beans gives you clean, sustained energy that will help you push through even the most grueling workouts. Taurine, tyrosine, and branched chain amino acids (BCAAs) provide essential nutrients that help your muscles recover faster so you can get back in the gym sooner. MASSIVE PUMPS: Creatine Nitrate (NO3-T) is a 2-in-1, patented and highly effective form of creatine that works as a nitric oxide booster helping produce incredible muscles pumps. NO3-T can enhance endurance, allowing you to train harder, longer. NEXT LEVEL POWER: ElevATP is a cutting-edge nutritional technology that helps increase lean muscle mass. It can also help you produce more strength and power output during training sessions. ElevATP is scientifically proven to help increase energy levels and ATP production.",
        fulfilled_by = 'Congo.com',
        sold_by = 'Congo.com',
        quantity = 10,
        price = 53.99,
        prime = True
    )

    p6 = Product(
        seller_id=2,
        title = 'Rivalus Rivalwhey Vanilla 10lb, Vanilla, 10 Pound',
        description ="Whey is amongst the most popular protein sources for athletes - and for good reason. Whey proteins are highly digestible, rich in all the essential amino acids (including the three BCAAs), and have a thin consistency that is exceptionally drinkable. Rivalwhey's 100% whey protein recipe blends high-purity whey isolate (primary protein source, BTW), ultra-filtered whey concentrate, and speedy whey hydrolysate to provide an exceptional balance of clean macros, great taste, unsurpassed quality, and bang for your hard-earned buck. So good it should have been called UNRIVALED WHEY.",
        fulfilled_by = 'Congo.com',
        sold_by = 'Congo.com',
        quantity = 10,
        price = 106.99,
        prime = True
    )

    p7 = Product(
        seller_id=2,
        title = 'Colgate Optic White Renewal Teeth Whitening Toothpaste with Fluoride, 3% Hydrogen Peroxide, High Impact White, Mint - 3 Ounce (2 Pack)',
        description ="Colgate Optic White Renewal is whitening that works. Get 10X whiter teeth* with this teeth whitening toothpaste, which contains dentist recommended hydrogen peroxide. With a patented 3% hydrogen peroxide formula which deeply whitens beyond surface stains, this hydrogen peroxide toothpaste not only removes surface stains, but also can penetrate to work below the tooth surface. Colgate Optic White Renewal toothpaste, High Impact White, is a mint toothpaste that has a refreshing mint flavor that freshens breath. It is also an anticavity fluoride toothpaste that helps to protect against cavities. Enamel-safe for daily use, add this Colgate whitening toothpaste to your oral care routine for teeth whitening that safely whitens the inside as well as the outside of your teeth. Colgate Optic White Renewal whitening and stain removal toothpaste is a vegan toothpaste that's also gluten-free and sugar-free. For good oral hygiene, brush your teeth twice a day for two minutes. Optic White toothpaste is made by Colgate, the brand that knows the power of a healthy smile. *vs. a fluoride toothpaste without hydrogen peroxide, after 4 weeks of use as directed.",
        fulfilled_by = 'Congo.com',
        sold_by = 'Congo.com',
        quantity = 1000,
        price = 10.18,
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
    db.session.add_all([fire_stick, p2, p3, p4, p5, p6, p7])
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
    pm9 = ProductImage(
        product_id=3,
        url='https://m.media-amazon.com/images/I/81LRcd7llnL._AC_SL1500_.jpg'
    )
    pm5 = ProductImage(
        product_id=4,
        url='https://m.media-amazon.com/images/I/71BuQGT+eXL._AC_SL1500_.jpg'
    )
    pm10 = ProductImage(
        product_id=4,
        url='https://m.media-amazon.com/images/I/61syEga94BL._AC_.jpg'
    )
    pm11 = ProductImage(
        product_id=4,
        url='https://m.media-amazon.com/images/I/71ZmYvecbIL._AC_SL1500_.jpg'
    )
    pm12 = ProductImage(
        product_id=4,
        url='https://m.media-amazon.com/images/I/71fH21RTA5L._AC_SL1500_.jpg'
    )
    pm13 = ProductImage(
        product_id=4,
        url='https://m.media-amazon.com/images/I/81Q+REjadzL._AC_SL1500_.jpg'
    )
    pm14 = ProductImage(
        product_id=5,
        url='https://m.media-amazon.com/images/I/61Gfn6E+9WL._AC_SL1500_.jpg'
    )
    pm15 = ProductImage(
        product_id=5,
        url='https://m.media-amazon.com/images/I/81EAbUrKeML._AC_SL1500_.jpg'
    )
    pm16 = ProductImage(
        product_id=5,
        url='https://m.media-amazon.com/images/I/819BYh7RAHL._AC_SL1500_.jpg'
    )
    pm17 = ProductImage(
        product_id=5,
        url='https://m.media-amazon.com/images/I/810x26LsPVL._AC_SL1500_.jpg'
    )
    pm18 = ProductImage(
        product_id=5,
        url='https://m.media-amazon.com/images/I/710SuGhhdkL._AC_SL1500_.jpg'
    )
    pm19 = ProductImage(
        product_id=6,
        url='https://m.media-amazon.com/images/I/61GQhwHALxL._AC_SL1200_.jpg'
    )
    pm20 = ProductImage(
        product_id=6,
        url='https://m.media-amazon.com/images/I/51RCANdHlfL._AC_SL1200_.jpg'
    )
    pm21 = ProductImage(
        product_id=6,
        url='https://m.media-amazon.com/images/I/61cP20X65UL._AC_SL1080_.jpg'
    )
    pm22 = ProductImage(
        product_id=6,
        url='https://m.media-amazon.com/images/I/71TmjHLMlTL._AC_SL1080_.jpg'
    )
    pm23 = ProductImage(
        product_id=6,
        url='https://m.media-amazon.com/images/I/8176shz92RL._AC_SL1500_.jpg'
    )
    pm24 = ProductImage(
        product_id=7,
        url='https://m.media-amazon.com/images/I/61gNhn1tf+L._SL1000_.jpg'
    )
    pm25 = ProductImage(
        product_id=7,
        url='https://m.media-amazon.com/images/I/61ZKYY+mCQL._SL1001_.jpg'
    )
    pm26 = ProductImage(
        product_id=7,
        url='https://m.media-amazon.com/images/I/51H7rZh4EIL._SL1001_.jpg'
    )
    pm27 = ProductImage(
        product_id=7,
        url='https://m.media-amazon.com/images/I/615H64cf73L._SL1001_.jpg'
    )
    pm28 = ProductImage(
        product_id=7,
        url='https://m.media-amazon.com/images/I/51GW7Eds5LL._SL1001_.jpg'
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
    db.session.add_all([onepm, twopm, pm3, pm4, pm5, pm6, pm7, pm8, pm9, pm10, pm11, pm12, pm13, pm14, pm15, pm16, pm17, pm18, pm19, pm20, pm21, pm22, pm23, pm24, pm25, pm26, pm27, pm28])
    db.session.commit()
    db.session.add(q1)
    db.session.add(a1)
    db.session.commit()


def undo_products():
    db.session.execute('TRUNCATE products RESTART IDENTITY CASCADE')
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE')
    db.session.commit()
