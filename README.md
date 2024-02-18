# food-hack

## Launching the backend
1. cd into the *backend* folder
2. run `npm i`
3. Rename `.env.example` to `.env` with the api keys
4. run `node main.js`
This server is running on port **8000**


## Launching the dev front end
1. cd into the *client/my-app* folder
2. run `npm i`
3. run `npm start`
This client server is running on port **3000**
This server has a proxy to the backend at _http://localhost:8000_