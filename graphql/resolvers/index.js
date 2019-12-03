
 const authQuerys = require('./querys/auth'); 
const authMutation = require('./mutations/auth'); 
const postSubcription = require('./subcriptions/post');
const rootResolvers = {
    Query: {
    ...authQuerys,
    
    } ,
    Mutation: {
    ...authMutation,

    },
    Subscription: {

    }
}
module.exports = rootResolvers; 