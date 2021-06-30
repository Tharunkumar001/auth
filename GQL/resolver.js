const { ApolloServer , gql, PubSub, withFilter} = require("apollo-server-express")
const User = require("../Modal/modalSchema")
const { subscribe } = require("graphql");
const pubsub = require("./PubSub");


const resolvers = {
    
    Query: {
        
        login(parent,args,context,info) {

            var findUser = User.findOne({ "email": args.email });
            return findUser
        }
    },

    Mutation: {
        isAuth(parent,args,context,info) {
            pubsub.publish('AUTH_CHECK', { checkAuth: args.input });

            const {email,password} = args.input
            let user = new User({
                email: email,
                password: password,
            });
            
            
            return user.save();
        }
    },

    Subscription: {
        checkAuth: {
           resolve: (args) => {
               console.log(args)
            const findUser = User.findOne({ "email": args.checkAuth.email });
            return findUser
           },

           subscribe: () => pubsub.asyncIterator("AUTH_CHECK")
        }
    }
}



module.exports = {
    resolvers
}