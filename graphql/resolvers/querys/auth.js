const bcrypt = require('bcryptjs');
const User = require ('../../../models/User.js');
const jwt = require('jsonwebtoken')

const transformUser = user => {
  return {
   ...user._doc, 
   password: null, 
   _id: user.id
  }
}
module.exports= { 
   currentUser: async (_ , args, context) => {
      if(!context.userId) {
         return null;
      }
      const user = await User.findById(context.userId);
     return transformUser(user);
   }

   }

   
