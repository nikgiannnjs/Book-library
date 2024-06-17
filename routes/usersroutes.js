const express = require('express');
const User = require('../Models/usersModel');
const router = express.Router();

router.post('/userSignIn', async (req , res) => {
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;
    
    try{
     if (password === passwordConfirm){
       const data = new User ({
           name: req.body.name,
           email: req.body.email,
           password: req.body.password,
           passwordConfirm: req.body.passwordConfirm
       });

       const newUser = await data.save(); 
       res.status(200).json(newUser);
       console.log('New user signed in succesfully.');
    
      }else{
        res.status(401).json({
            message:'Password and password confirmation are not the same.'
        });
        console.log('Password and password confirmation are not the same.');
      };

    }catch{
        res.status(500).json({
            message:'Something went wrong while trying to sign in a new user.'
        });
    };
   });

   module.exports = router;