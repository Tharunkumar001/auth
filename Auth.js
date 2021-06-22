const lodash = require("lodash");
const graphql = require("graphql")

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const __ = require("./Modal/modalSchema");

const jwt = require("jsonwebtoken");

const userType = new GraphQLObjectType({
    name: "login",

    fields: () => ({
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    }),
});

const AuthType = new GraphQLObjectType({
    name: "addUser",

    fields: () => ({
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        phone: { type: GraphQLString },
    }),
});


const Query = new GraphQLObjectType({
    name: "rootQuery",

    fields: {
        login: {
            type: userType,
            args: { email: { type: GraphQLString }, password: { type: GraphQLString } },

            resolve(parent, args) {
                const findUser = __.findOne({ "email": args.email });
                return findUser
            }
        }

    }
})


const Mutation = new GraphQLObjectType({
    name: "mutation",

    fields: {
        addUser: {
            type: AuthType,

            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                phone: { type: GraphQLString }
            },

            resolve(parent, args) {

                // const findUser = __.findOne({ "email": args.email });

                let user = new __({
                    email: args.email,
                    password: args.password,
                    phone: args.phone,

                });


                return user.save();


            }
        }
    }


})

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})