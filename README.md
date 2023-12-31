### Project Description
   - The urgent need to address clothing wastage and transition towards a more sustainable and eco-conscious approach in managing clothing items is driven by the pervasive issue of clothing wastage, which not only significantly contributes to environmental pollution and waste but is also tied to a burgeoning market valuation in the fashion industry. Each year, a considerable number of individuals dispose of unused or unwanted clothing items in a wasteful manner, leading to harmful environmental consequences. This dual challenge calls for a more responsible, sustainable, and environmentally friendly solution. Furthermore, there is a notable lack of convenient and accessible methods for individuals to repurpose, reuse, and recycle their clothing within this evolving market landscape.
   
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
- visit this link to add extension: https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino

## Steps to start the app:

1. clone the repo and change directory to backend
   -  create a .env file in the backend folder and include the following:
   ``` 
      MONGO_URL = mongodb+srv://kannappan:no3jzuG3iGufnoLK@cluster0.yfimik1.mongodb.net/WAD?retryWrites=true&w=majority
      JWT_SECRET = qQNDgcTyH78pt9QzhL8rKXfqPFRFwwRu
      JWT_LIFETIME = 30d

      CLOUD_NAME = dzqrn1uyk
      CLOUDINARY_API_KEY = 535961658238921
      API_SECRET = 6RfCeGVhbZ_Hov3ZNDCn5Fnh_60


      OPENAI_API_KEY = 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
   ```
   ### Run the following commands
   -  npm install
   -  node app.js

2. change directory to front-end/vue-project and run 
   - npm install
   - npm run dev

