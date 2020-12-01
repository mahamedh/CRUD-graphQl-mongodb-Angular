const bodyParser=require('body-parser');
const express = require('express');
const mongoose= require('mongoose');
const dotenv = require('dotenv');
const cors= require ('cors');

dotenv.config({ path: './config.env' });
const { graphqlHTTP} = require('express-graphql');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const app= express(); //initiating express
app.use(bodyParser.json());  // pass response to json in format
app.use(cors());   //using angular forentend


app.use(
  '/graphql',
 graphqlHTTP(
{
   schema: graphqlSchema,
   rootValue: graphqlResolver,
   graphiql:true,
}
 ))

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
  );
  
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true 
    })
    .then(con => {
      console.log(con.connections);
      console.log('Db connection successfull!');
    })
    .catch(err => { // we will not be here...
      console.error('App starting error:', err.stack);
      process.exit(1);
  });
  
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`App running on port ${port}....`);
  });
  
