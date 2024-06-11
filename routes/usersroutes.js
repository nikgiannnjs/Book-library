const express = require('express');
const User = require('../Models/usersModel');
const router = express.Router();

router.post('/userSignIn', async (req , res) => {
    try{
       const data = new User ({
           name: req.body.name,
           email: req.body.email,
           password: req.body.password,
           passwordConfirm: req.body.passwordConfirm
       })
   
       const newUser = await data.save(); //kanei save ta data pou stelnw
       res.status(200).json(newUser);
       console.log('New user signed in succesfully.');
    }catch{
       res.status(400).json({
           message:'Something went wrong while trying to sign in a new user.'
       });
    };
   });

   module.exports = router;