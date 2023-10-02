### NPM Packages Needed:

1.Mongoose
2.Express
3.bcrypt(to encrypt passwords)
4.jsonwebtoken(to create JWT by signing payload w secret key and verifying token sent bt browser)
5.http-status-codes
6.express-async-errors
7.dotenv
8.cloudinary(to host images on cloud)

# Security packages
1.xss-clean(prevent cross site scripting)
2.express-rate-limit(limit tge traffic coming to routes)
3.hemlet
4.cors


### Database collections/Models

# User
fields required in collection:
    - username
    - email(unique)
    - password

# Product(clothing product)
fields required in collection:
    -owner(user; link the product object to the User object)
    -name
    -description(what category of the clothing it falls under)
    -size(use asian standard sizings;may wanna include measurement chart in the front-end)-->XS,S,M,L,XL,XXL
    -gender
    -image of clothing item

# Simplified the app by removing chat and swap features; users will now only be able to list clothes they want to giveaway and the beneficiaries will be able to see the address of collection(basically connect those who need clothes to those who are giving it away)




























