# Messenger

Welcome to this instant messaging app !

## Run project
### Server

In the server directory, run `sequelize db:migrate` to initialize the database tables.
Then run `npm run dev` to run the server in development mode.\
Open [http://localhost:8080/api](http://localhost:8080/api) to open the graphql playground.\

For it to work correctly, you need to have a postgres server running on localhost:5432 named postgres, with user "postgres" and password "postgres"

### Client
In the client directory, run `npm start` to run the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Code organisation
### Server
database contains the models and migrations used by sequelize to create data in the database\
graphql contains everything used by graphql (schema, resolvers and context)

### Client
components contains all components\
styles contains all styles