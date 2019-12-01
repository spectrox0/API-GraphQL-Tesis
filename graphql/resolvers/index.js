
 const authQuerys = require('./querys/auth'); 
const authMutation = require('./mutations/auth'); 
const rootResolvers = {
    Query: {
    ...authQuerys,
    
    } ,
    Mutation: {
    ...authMutation,
    



    }
}
module.exports = rootResolvers; 