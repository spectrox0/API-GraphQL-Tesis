const Post = require ('../../../models/Post.js');
const User = require('../../../models/User.js')
 const {user} = require('../merge');


const transformPost = (post) => {
  return {
      ...post._doc,
      _id:post.id,
      creator: user.bind(this, post._doc.creator)
  }
}
module.exports = { 
   
    createPost: async (_, {postInput}, context) => {
       
        if(!context.token) {
            console.log("entra")
            throw new Error('No Authorized')
           
        }
        try {
            const creator = await User.findById(postInput.creator);
            if(!creator) {
                throw new Error("No creator");
            }
            const newPost = await new Post({
                title : postInput.title,
                creator: postInput.creator,
                urlImg: postInput.urlImg,
                category: postInput.category
            }); 
            const result = await newPost.save(); 
            creator.posts.push(result.id);
            await creator.save();

            return transformPost(result);
        } catch(err) {
            throw err;
        }
        
    }


}