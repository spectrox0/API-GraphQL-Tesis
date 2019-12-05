const Post = require ('../../../models/Post.js');
const {user} = require('../merge');

const {dateToString} = require('../date.js'); 
const transformPost = (post) => {
  return {
      ...post._doc,
      _id:post.id,
      creator: user.bind(this, post._doc.creator),
      date: dateToString(post._doc.date)
  }
} 
module.exports = {
   
    posts: async () => {
        try {
        const posts = await Post.find({active:true}).limit(100); 
        if(posts) {
            return  posts.map( post => transformPost(post));
        } else throw new Error("Not found");

        }catch(err) {
            throw err;
        }
    }
}