const bcrypt = require('bcryptjs');
const User = require ('../../../models/User.js');
const jwt = require('jsonwebtoken')


module.exports = {
    createUser :  async (_, {userInput}, context) => {
        try { 
        const invalidEmail = await User.findOne({active: true , email: userInput.email.toLowerCase()}); 
        if(invalidEmail) {
            throw new Error('email not disponible');
        } ; 
        const invalidUsername = await User.findOne({active:true , username:userInput.username.toLowerCase()})
        if (invalidUsername) {
            throw new Error('username not disponible');
        }
        const hashedPassword = await bcrypt.hash(userInput.password,12);
           
        const newUser = await new User({
            email : userInput.email.toLowerCase(),
            name: userInput.name,
            password : hashedPassword, 
            username: userInput.username.toLowerCase(), 
            urlImg: userInput.urlImg
        }); 
        const result = await newUser.save(); 
        if(result) {
            return {
                ...result._doc,
                password: null, 
                _id: result.id
            }
        }
    }
        catch( err) {
            throw err;
        }
    
    } , 
    login: async (_,{username, password}) => {
        const user = await User.findOne({active:true , username:username.toLowerCase()}); 
        if(!user) {
            throw new Error('user or password incorrect'); 
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if(!isEqual) {
            throw new Error('user or password incorrect'); 
        }
        const token = jwt.sign({userId: user.id , username :user.username}, process.env.CREDENTIALS_JWT, {
        expiresIn: '6h'
          }
        ); 
        
        return { 
            userId: user.id ,
            token:token , 
            name: user.name, 
            username: user.username, 
            urlImg: user.urlImg,
            tokenExpiration:6}

    },
    updateUser: async (_ , {userInput} , context ) => {
        if(context.userId!== userInput._id) {
            throw new Error("Incorrect user"); 
        } 
        try { 
        const user = await User.findOne({_id: userInput._id}); 

        const isEqual = await bcrypt.compare(userInput.password, user.password);
        if(!isEqual) {
            throw new Error('user or password incorrect'); 
        }

        await User.updateOne(
             {_id: userInput._id}, {
             $set: {
                  name: userInput.name,
                  username: userInput.username,
                  urlImg: userInput.urlImg
                    } });
        await user.save();
        return { 
        ...user._doc,
        _id: user.id
        }

    } catch (err) {
        throw err;
    }
    }
  
} 