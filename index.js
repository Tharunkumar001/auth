const express = require("express");
const app = express();

const { graphqlHTTP } = require("express-graphql");

const dotenv = require("dotenv");
dotenv.config();

const schema = require("./Auth");


var mongoose = require("mongoose");

mongoose.connect(process.env.API_URL, { useNewUrlParser: true, useUnifiedTopology: true }, function() {
    console.log('database connected');
})


app.use("/", graphqlHTTP({
    schema,
    graphiql: true
}));


app.listen(process.env.PORT, () => {
    console.log(`server focusing on port ${process.env.PORT}`)
});