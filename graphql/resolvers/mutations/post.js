const Post = require ('../../../models/Post.js');
 
const transformUser = (user) => {
  
}
module.exports = { 
   
    createPost: async (_, {postInput}, context) => {
       
        if(!context.token) {
            throw new Error('No Authorized')
        }
        try {
            const newPost = await new Post({
                title : postInput.title,
                creator: postInput.creator,
                urlImg: postInput.urlImg
            }); 
            const result = await newPost.save(); 
            return {
                ...result._doc,
                id: result.id
            }
        } catch(err) {
            throw err;
        }
        
    }


}