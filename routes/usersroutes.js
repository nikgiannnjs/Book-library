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

router.get('/allUsers', async (req , res) => {
    try{
        const allUsers = await User.find();
        res.status(200).json(allUsers);
        console.log('All Users in DB response was successful.');
    }catch{
        res.status(500).json({
            message:'Something went wrong while trying to send all Users.'
        });
    };
   });

router.get('/userById/:id', async (req,res) => {
    try{
        const requestedUser= await User.findById(req.params.id);
        res.status(200).json(requestedUser);
        console.log('Requested user successfully sent.');
      
    }catch{
       res.status(500).json({
           message:'Something went wrong while trying to send a user by its id'
       });
    }
   });

router.patch('/updateUsernameoremailById/:id', async (req,res) => {
    try{
        const password = req.body.password;
     if (typeof password !== 'undefined'){
        res.status(401).json({
            message:"You cannot update password on this link, only username and email. For password updates please visit this link."
        });     
     }else{
       id = req.params.id;
       updatedbody= req.body;
       const options = { new: true };
       
       updatedUser= await User.findByIdAndUpdate(id, updatedbody, options);
       
       res.status(200).json(updatedUser);
       console.log('User was updated successfully.');
     };   
    }catch{
       res.status(500).json({
           message:'Something went wrong while trying to update a user.'
       });
    }
   });

router.delete('/deleteUserById/:id', async (req,res) => {
    try{
       id = req.params.id
       const userToDelete = await User.findByIdAndDelete(id);
       res.send(`User with ${id} id, was successfully deleted.`);
       console.log('The user was deleted successfully.');
    }catch{
       res.status(500).json({
           message:'Something went wrong while trying to delete a user.'
       });
    };
   });   
   module.exports = router;