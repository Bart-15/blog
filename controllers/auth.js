const User = require('../models/user');
const path = require('path');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { checkout } = require('../routes/post');
require('../database')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const secret = process.env.SECRET_KEY

const signup = async(req, res) => {
    const {name, email, password} = req.body;
    try{
        if(!name || !email || !password) {
            return res.status(400).json({message:"Check all fields."})
        }

        // check email if existed already
        const checkUser = await User.findOne({email:email});
        if(checkUser) {
            return res.status(400).json({
                message:"Email is already taken."
            })
        }

        // hash the password
        const hashedPass = await bcrypt.hash(password, 10);
        const image =  gravatar.url(email, {protocol: 'https',s: '200', r: 'pg', d:'mm'})

        const newUser = {
            name,
            email,
            password: hashedPass,
            image
        };

        const user = await new User(newUser);
        await user.save();
        res.status(200).json({
            success:true,
            message:"User created successfully!."
        })

    }catch(e) {
        res.status(500).send("Can't create new user.")
    }

}


const login = async(req, res) => {
    try {
        const user = await User.findOne({email:req.body.email});
        // check user
        if(!user) {
            return res.status(404).json({
                message:"User not found."
            })
        }

        // check pass
        const comparePass = await bcrypt.compare(req.body.password, user.password);
        if(!comparePass){
            return res.status(404).json({
                message:"Check your email and password."
            })
        }

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role
        }

        const token = jwt.sign(payload, secret, {expiresIn: 3600});
        res.cookie('jwt', 
                    token, 
                    {httpOnly: true, secure:false}
                    )
                  .status(200).json({
                      success: true,
                      message:"You have logedin."
                  });  
    }catch(e) {
        res.status(500).json("Server Error")
    }
}

const profile = async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.send({
            success:true, 
            user
        })
    } catch(e) {
        res.send(500).send("Server Error");
    }
}

const updateProfile = async(req, res) => {
    try {
        // find user
        const user = await User.findById(req.user.id);
        if(!user) {
            return res.status(404).json({message:"User not found."});
        }

         // -> Todo


        // let newPassword;
        // if(!req.body.old_password){
        //    newPassword = user.password;
        // } else {
        //     //check password
        //     const checkPass = await bcrypt.compare(req.body.old_password, user.password);
        //     if(!checkPass) {
        //         return res.status(400).json({
        //             message:"Password not match"
        //         })
        //     }
            
        //     newPassword =  await bycrypt.hash(req.body.new_password, 10)
        // }

        // console.log(newPassword)


    }catch(e){
        res.status(500).send("Can't update user profile.")
    }
}


const logout = async(req, res) => {
    try {
        if (req.cookies['jwt']) {
            res
            .clearCookie('jwt')
            .status(200)
            .json({
                message: 'You have logged out'
            })
        } else {
            res.status(401).json({
                error: 'Invalid jwt'
            })
        }
    

    }catch(e) {
        res.send(500).send("Server Error");
    }
}

module.exports = {
    signup,
    login,
    profile,
    logout,
    updateProfile
}