const {gql} = require("apollo-server-express")



const typeDefs = gql`
input userInput{
    email: String,
    password: String,
  
}

type User{
    email: String,
    password: String,
}

type Query {
    login(email:String): User
}

type Mutation{
    isAuth(input:userInput) : User
}

type Subscription{
    checkAuth: User
}

`;

module.exports = {
    typeDefs
}
