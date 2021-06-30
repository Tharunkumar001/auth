const express = require("express");
const app = express();
const cors = require("cors")

const { ApolloServer , gql, withFilter} = require("apollo-server-express")
const { graphqlHTTP } = require("express-graphql");
const jwt = require("jsonwebtoken");

const {createServer} = require("http");


const PORT = 4000;

const dotenv = require("dotenv");
dotenv.config();

const bodyParser = require("body-parser")
const User = require("./Modal/modalSchema")



var mongoose = require("mongoose");

mongoose.connect(process.env.API_URL, { useNewUrlParser: true, useUnifiedTopology: true }, function() {
    console.log('database connected');
})

app.use(cors({ credentials: true, origin: "*" }))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// const { typeDefs, resolvers } = require("./GQL/isAuth")

const {resolvers} = require("./GQL/resolver");
const {typeDefs} = require("./GQL/typeDefs");

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground:{
        endpoint: "http://localhost:4000/graphql"
    }
  
})

server.applyMiddleware({ app });


const ws = createServer(app);
server.installSubscriptionHandlers(ws);

ws.listen(PORT, () => {
    console.log(`grahql api url at ${PORT}`);
    console.log(`grahql subscription url at ${PORT}`)

});