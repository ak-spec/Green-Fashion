
```
Green-Fashion
├─ .DS_Store
├─ .vscode
│  └─ launch.json
├─ back-end
│  ├─ app.js
│  ├─ controllers
│  │  ├─ authController.js
│  │  ├─ listingController.js
│  │  ├─ productController.js
│  │  └─ productUploadController.js
│  ├─ db
│  │  └─ connect.js
│  ├─ errors
│  │  ├─ bad-request.js
│  │  ├─ custom-api.js
│  │  ├─ index.js
│  │  ├─ not-found.js
│  │  └─ unauthenticated.js
│  ├─ middleware
│  │  ├─ auth.js
│  │  ├─ errorHandler.js
│  │  └─ notFound.js
│  ├─ models
│  │  ├─ productModel.js
│  │  └─ userModel.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ README.MD
│  ├─ routes
│  │  ├─ authRoute.js
│  │  ├─ listingRoute.js
│  │  └─ productRoute.js
│  └─ tmp_images
│     ├─ tmp-1-1697293943740
│     ├─ tmp-2-1697298999107
│     └─ tmp-8-1697298548307
└─ front-end
   ├─ .DS_Store
   ├─ README.md
   └─ vue-project
      ├─ .vscode
      │  └─ extensions.json
      ├─ index.html
      ├─ package-lock.json
      ├─ package.json
      ├─ README.md
      ├─ src
      │  ├─ App.vue
      │  ├─ assets
      │  │  ├─ images
      │  │  │  ├─ logo.jpeg
      │  │  │  ├─ wad-background2.jpeg
      │  │  │  └─ WAD-Backgroung.jpeg
      │  │  └─ main.css
      │  ├─ components
      │  │  ├─ AllUserProducts.vue
      │  │  ├─ DashBoard.vue
      │  │  ├─ LoginRegisterForm.vue
      │  │  ├─ NavBar.vue
      │  │  ├─ PublicListings.vue
      │  │  ├─ UploadProduct.vue
      │  │  └─ Upstyling.vue
      │  ├─ main.js
      │  └─ router
      │     └─ index.js
      └─ vite.config.js

```
## Git URL:
  - https://github.com/ak-spec/Green-Fashion.git

## Things needed in .env file in backend folder:

1. OpenAI API key 
2. Cloudinary API key(used to store user's clothing images), 
3. CLOUD_NAME(for cloudinary)
4. MongoURL ,
5. JWT_SECRET
6. JWT_LIFETIME 

## Note: Pls install cors unblock extension to access the sort by distance feature in the app

## Steps to start the app:

1. clone the repo and change directory to backend and run
   -  npm install
   -  node app.js

2. change directory to front-end/vue-project and run 
   - npm install
   - npm run dev

