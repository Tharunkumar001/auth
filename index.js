const express = require("express");
const app = express();
const cors = require("cors")

const { graphqlHTTP } = require("express-graphql");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

const schema = require("./GQL/Auth");
const router = require("./Rest/router")

const __ = require("./Modal/modalSchema")
var mongoose = require("mongoose");

mongoose.connect(process.env.API_URL, { useNewUrlParser: true, useUnifiedTopology: true }, function() {
    console.log('database connected');
})

app.use(cors({ credentials: true, origin: "*" }))



app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

app.get("/signin", (req, res) => {
    const foundUser = __.findOne({ "password": req.body.password }).then((done) => {
        if (done.email) {
            res.status(200).send(done.email);

        } else {
            __.create({

                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                },

                function(err, user) {
                    if (err) return res.status(500).send("issues to registering a user");

                    const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '1d' });

                    res.status(200).send({ auth: true, token: token });
                })
        }
    })

})


app.get("/login", (req, res) => {
    var token = req.body.jwt;

    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });


        const foundUser = User.findOne({ "_id": decoded.id }).then((result) => {
            res.send(result.email)
        })

    })
})

app.listen(process.env.PORT, () => {
    console.log(`server focusing on port ${process.env.PORT}`)
});