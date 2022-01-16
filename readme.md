# Overview
This is a sample project to implement papajoke API as serverless functions using Netlify, and implement the backend database in faunadb.


# Setup
After cloning this repo

add .env file

```
FAUNADB_SECRET=<your secret>
FAUNADB_DOMAIN=<the db domain>
```

Setup the package dependencies

```
yarn
```

Run the db setup script

```
node ./db-setup/bootstrap.js
```

# TODOs
 1. Create build step for client application
 1. Implement Admin APIs
   1. Approve
   1. 
