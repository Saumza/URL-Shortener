URL Shortener Application
An URL Shortener Application that supports analytics made with NextJS, Express, MongoDB, Redis. No login, no paywall, no authentication needed.


Features
- Click Analytics Support
- Fast Redirection
- Caching


Tech Stack
- NextJS -> Frontend Client
- ExpressJS -> Backend Server
- MongoDB -> Persistant Database Storage
- Redis -> Caching 
- Docker -> Containerization


Architecture Overview

    Client (React) 
        │ 
        ▼ 
    Express API Server 
        │ 
        ├── Url Shortening  
        ├── Redirect Url
        ├── Analytics Support 
        │ 
        ▼ 
      Redis
        │ 
        ▼
      MongoDB 


ShortCode Generation Process
-> ShortCodes are generated for now using NanoId but for future expansion we can use a sequence number and can Base62 encode with it. For distributed system for each machine id + sequence + Base62 Encoding to keep the urls unique.


Project Structure

    client/ 
        ├── components/ 
        ├── pages/ 
        ├── hooks/ 
        ├── services/ 
        ├── stores/ 
        ├── routes/
        └── dockerfile
    server/ 
        ├── controllers/ 
        ├── models/ 
        ├── routes/ 
        ├── middlewares/ 
        ├── services/ 
        ├── providers/ 
        ├── utils/
        └── dockerfile
    Docker-compose.yml
    Readme.md


Installation

git clone repository-url

cd project-name


Backend Setup 

cd server

npm install


Environment Variable's

Create an .env file

Add the following env's

PORT

MONGODB_URI

REDIS_URL

CORS_ORIGIN

WEBSITE_URL

npm run dev


Frontend Setup 

cd urlshortenerui
npm install


Environment Variable's

Create an .env file

Add the following env's

BACKEND_API_URL

NEXT_PUBLIC_WEBSITE_URL 

npm run dev


Build and Run with Docker

docker compose up --build

Run in detached Mode

docker compose up --build -d


API Endpoints
1. <post/api/uploadUrl> = shortened the url
2. <get/:code> = redirection to original website
3. <get/api/analytics/shortenedUrl?> = analytics for the shortened link


Design Decisions
1. For Shortened Url right now I am using NanoId and the trade-off for this is for production base there might be some duplication for some shortened URL which might cause an issue. 
2. For now in Cache the URL which are uploaded are staying there and not getting evicted as this is just for a personal project and the trade-offs are that the Cache will be full at some point and then the cache needs to be cleared manually.


Future Improvements
1. Using the Base62 encoding along with Machine ID and Sequence to setup shortenedId using Redis for multiple distributed servers and Redis as a central registry and sequence storage and incrementation.
2. Using the LRU Cache style to evict not Frequently used Datas and also using TTL from Redis.
3. Using the Redis to update the analytics and occasionally flush the data from the Redis to the DB to maintain consistency.
