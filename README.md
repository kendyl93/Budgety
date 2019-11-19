# Budgety react app(in progress)

This app is created to calculate budget with my hommies. App is deployed on [AWS](http://ec2-18-216-56-193.us-east-2.compute.amazonaws.com)

## dev

Steps to start the app:

1. Install dependencies `npm install` in root folder
2. Start development mode of the app `npm run start`

### Project consists of:

App consist of:

Backend:

- NodeJS
- Express
- Mongoose
- JWT tokens - to sign data stored in cookie. This ensures me that the data comes from my server.

Database:

- Mongo

Frontend:

- React
- Webpack
- Jest
- SASS

App was deployed and store in Heroku.

#### TODO (Still in progress)

1. Deploying automation
2. Optimize wepback production config file
3. Many more features...

### Deploy Server (AWS)

0. Make sure to update the `.env` file if needed.
1. Install deps `npm install`
1. Restart [pm2](http://pm2.keymetrics.io/docs/usage/quick-start/) process `pm2 start npm --name "backend" -- run start:production`

### Deploy Client (AWS)

0. Make sure to update the `.env` file if needed.

- Build the project with `npm run build`
- Make sure you are in `dist` dir.
- Transfer files existnig in dist `scp -i ~/.ssh/sshFileName.pem * userName@hostName:~/dirName`
- Transfer also the `static-server.js`(the way as server).

##### Deploying client-server (Heroku) - not supported any more

0. Make sure to update the `.env` file if needed.
1. Check `.env` variables on client side
1. Build client `npm run build` make sure you are in the client directory
1. Copy builded files to `public` direactory on server and commit changes
1. Push changes to heroku master `git push heroku master`
1. Revert `.env` variables on the client side if needed
