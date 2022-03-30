const User = require('../model/user.model');
const bcrypt = require('bcryptjs');
const auth = require('../middlewares/auth.js');

async function login({username, password}, callback){
    const user = await User.findOne({ username });

    if(user != null){        //checking user is not null
        if(bcrypt.compareSync(password, user.password)){   //compare password of database with enter password by user
            const token = auth.generateAccessToken(username);      //if password found get token from auth api
            return callback(null, {...user.toJSON(), token});      
        }
        else{
            return callback({
                message : "Invalid Password/Username"
            })
        }
    }
    else{
        return callback({
            message : "Invalid Password/Username"
        })
    }
}

async function register(params, callback){
    if(params.username === undefined){
        return callback({message : "Username Required"});
    }

    const user = new User(params);
    user.save()
    .then((response) => {
        return callback(null, response);
    })
    .catch((error) =>{
        return callback(error);
    });
}


module.exports ={
    login,
    register
}