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
    r5 = Review(
        user_id = 3,
        product_id = 3,
        title = 'Perfect',
        review = "This is exactly what I was looking for! Can watch cable through provider app and my other streaming services (HULU, Netflix, Amazon Prime, Peacock). Sounds good and picture is crystal clear.",
        rating = 5,
    )
    r5i1 = ReviewImage(
        review_id = 5,
        url = 'https://m.media-amazon.com/images/I/61vnAkxMxFL.jpg'
    )
    r6 = Review(
        user_id = 3,
        product_id = 4,
        title = 'Amazing Mini Pc Under Budget',
        review = "The Computer comes with a lot of useful features, so it is a really great choice if you have a small budget. This mini PC comes with a high speed Intel Celeron J4125 processor. With a powerful processor and a pre-installed copy of Windows 11, it has a powerful core. I bought the 8GB RAM/128GB storage pc (windows 11 pro) and it performs very well. The internet browsing, Netflix or Youtube watching, and doing some other work were seamless and there was no lag at all. A dual-screen model can be used (2 HDMI and 1 VGA port), which reduces waiting time and increases work efficiency. I can carry it with me when traveling and watch movies on any TV. Don't expect to play heavy games on it, however. The machine isn't specifically designed for playing games. For home use, it's satisfactory. The power and speed of the machine are both sufficient. Excellent product. My keyboard and mouse are attached to this mini PC where I am typing this review.",
        rating = 5,
    )
    r6i1 = ReviewImage(
        review_id = 6,
        url = 'https://m.media-amazon.com/images/I/7179KhG2PUL.jpg'
    )

    r7 = Review(
        user_id = 3,
        product_id = 5,
        title = 'A good pump but....',
        review = "The product comes in a large tub which is great, because more is always better than less. The scoop inside is large (really big compared to others...looks more like a protein powder scoop), the flavor is a bit sour but tolerable. I do like that I get a good pump and it looks like I am sweating more than usual (ALWAYS a plu). On the downside it does give that itchy feeling that I personally do not like but other than that not too bad, I might just take a smaller scoop",
        rating = 4,
    )
    r7i1 = ReviewImage(
        review_id = 7,
        url = 'https://m.media-amazon.com/images/I/713TxIoULXL.jpg'
    )
    r8 = Review(
        user_id = 3,
        product_id = 5,
        title = 'Feel the difference',
        review = "I have been taking this before my workouts and I can feel my body jump start into high gear. Has all the ingredients that one would want to take before and after a workout. The flavor is great and it mixes well. I have no complaints at all. Definitely recommend.",
        rating = 5,
    )
    r8i1 = ReviewImage(
        review_id = 8,
        url = 'https://m.media-amazon.com/images/I/61hyFCAfJfL.jpg'
    )
    r9 = Review(
        user_id = 3,
        product_id = 5,
        title = 'AMAZING flavor and awesome pump',
        review = "This stuff tastes awesome. Tastes just like fruit punch with a kick of caffeine and energy without the jitters. Mixes easily without a shaker bottle. The only complaint is that the font is SUPER TINY. I had to take a picture with my phone so I could zoom in. It recommends mixing with 10-12 oz of water, which I prefer the 12 oz as it needs the extra dilution imo.",
        rating = 5,
    )
    r9i1 = ReviewImage(
        review_id = 9,
        url = 'https://m.media-amazon.com/images/I/61uMZ3iskmL.jpg'
    )
    r9i2 = ReviewImage(
        review_id = 9,
        url = 'https://m.media-amazon.com/images/I/61BMMpK5iHL.jpg'
    )
    r9i3 = ReviewImage(
        review_id = 9,
        url = 'https://m.media-amazon.com/images/I/81U-r5-6VEL.jpg'
    )
    r10 = Review(
        user_id = 3,
        product_id = 5,
        title = 'very effective for me = pricey',
        review = "The Strawberry - Lemon-aid flavor taste is pretty good. It's just as you might imagine,a sweet strawberry with a bit of citric kick. The label states this is naturally flavored.It mixes instantly - stirs completely with a spoon.but does settle so needs swirled as it's drank.> The scoop is extra large as compared to what I normally see included in energy drinks.> The 47CC is the equivalent of approx 3.17 tablespoons.THAT'S a lot of powder in one drink and is my guess why it settles more.A suggested serving is one scoop (included) in 10-12 oz water at least 20-30 minutesbefore exercise, and may want to start with half a serving till you find you're tolerance.I used 2/3rds scoop in 8oz water, and found that's plenty for results for me.> Especially with 388mg caffeine (nearly 4 cups perked coffee) includedamong highly energizing ingredients.This combination is power packed and I started feeling an effective boost in 15 minuteswhich energizes and speeds up thinking / focus - and lasts though the day.There are signs of Kaged being more health conscious than many energy drinks.> Because the three B vitamins are surprisingly in there naturally occurring formsand/or there biologically active form.> Magnesium citrate - is among the most bioavailable = easily absorbed in your digestive tract,forms of magnesium.> Sodium - sea salt> Potassium - from coconuts> With only 1 gram sugar & 2 gram carbohydratesThis is a good product but just know that the 24oz container is only 20 servings.=approx $3.00 each which is considerably more costly than usual.> The lid is unnecessarily most of 5 dia.Allergen warning - contains coconuts.",
        rating = 5,
    )
    r10i1 = ReviewImage(
        review_id = 10,
        url = 'https://m.media-amazon.com/images/I/71AAnyftWgL.jpg'
    )
    r11 = Review(
        user_id = 3,
        product_id = 6,
        title = 'good, not bad',
        review = "I bought this product for the second time, I really like it and I will highly recommend it, but the second time I opened the box, the product was damaged inside. There was powder in the box. I wanted it as a gift for my friend, but i can't give it to him :( how can i do?",
        rating = 4,
    )
    r11i1 = ReviewImage(
        review_id = 11,
        url = 'https://m.media-amazon.com/images/I/71uPW1JgObL.jpg'
    )
    r11i2 = ReviewImage(
        review_id = 11,
        url = 'https://m.media-amazon.com/images/I/71qe9yQiOXL.jpg'
    )
    r12 = Review(
        user_id = 3,
        product_id = 6,
        title = 'Great Tasting',
        review = "This is a great tasting protein powder that goes down well. Forget about your mixing cup and water. Get a Vitamix Explorian Blender, some Walmart Vanilla Soy Milk, put the amount you want in the blender jar and put it into the freezer until it's mushy. Put three heavy pinches of frozen Walmart unsweetened coconut flakes, then blend in the protein powder and any frozen fruit chunks you want or just plain. Very good.",
        rating = 5,
    )
    r13 = Review(
        user_id = 3,
        product_id = 7,
        title = 'Suspicious knock off?',
        review = "I buy this toothpaste all the time from Walmart. My package looks like the picture advertised, every time I buy it. You can see from the picture that is not what I got. The box feels cheap compared to the one I buy in the store and so do the tubes, like a knockoff. You can see the one I recieved vs. the one I got in store. I have noticed some minor differences in text/design but the back says that the tubes are now recyclable. That's the only explanation that may be possible. They both have the same expiration date as well, I bought my last box about two weeks ago from Walmart, it was also a double pack. I did some research and I think it's interesting that Colgate doesn't list Amazon as their online retailer for where you can buy this toothpaste, surely if it was legit they would list Amazon? As far as the actual toothpaste I buy in the store, I love it. I have been using it for months even before I got Invisalign and I love how white my teeth have become. Everyone complains about my teeth, my gums, etc. but I don't think they realize how hydrogen peroxide works. You will see white spots on your gums when you brush too hard because it's killing the bacteria, like you do when you use hydrogen peroxide on a wound. The toothpaste in these tubes is the same consistency as the one I buy in store, it's not 'watery'. That's how it normally is, that's hydrogen peroxide in the paste. Just mix it a little in the tube before you use it and you won't have that problem. It's worth the money when you buy it from the store but this package from Amazon really has me suspicious. I will not be buying this on Amazon again, I will continue to buy from the store.",
        rating = 3,
    )
    r13i1 = ReviewImage(
        review_id = 13,
        url = 'https://m.media-amazon.com/images/I/91RXfWoSahL.jpg'
    )
    r14 = Review(
        user_id = 3,
        product_id = 7,
        title = 'Great toothpaste...',
        review = "This toothpaste has got to be the best ever and I should know because I have tried so many different ones. Your teeth feel amazingly clean and your breath fresh.My teeth are whiter, not like bright white but whiter than they have been in quite awhile. The toothpaste is also sugar free which is a plus because as you know, sugar is not a friend of teeth. So if you are looking for an honest toothpaste that will do what it says this is the one for you.Of course I would recommend!",
        rating = 5,
    )
    r14i1 = ReviewImage(
        review_id = 14,
        url = 'https://m.media-amazon.com/images/I/71C-mRlnBbL.jpg'
    )
    r15 = Review(
        user_id = 3,
        product_id = 7,
        title = 'Exactly what was expected so warm and comfortable',
        review = "A must buy .The warm fuzzy inside keeps you warm.And so many colors to choose from to match what I am wearing.I couldn't decide on just one so I bought 5. Definitely worth it.",
        rating = 5,
    )
    r15i1 = ReviewImage(
        review_id = 15,
        url = 'https://m.media-amazon.com/images/I/71UCvuZswxL.jpg'
    )


    db.session.add_all([r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14, r15])
    db.session.add_all([r3i1, r4i1, r5i1, r6i1, r7i1, r8i1, r9i1, r9i2, r9i3, r10i1, r11i1, r11i2, r13i1, r14i1, r15i1])

    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE')
    db.session.commit()
