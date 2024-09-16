const express = require("express");
const mongoose = require("mongoose");
const User = require("../Models/usersModel");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const crypto = require("crypto");
const sendEmail = require("../email");

router.post("/userSignIn", async (req, res, next) => {
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;

  try {
    if (password === passwordConfirm) {
      const data = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
      });

      const newUser = await data.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      res.status(200).json({
        token,
        data: {
          user: newUser,
        },
      });
      console.log("New user signed in succesfully.Password is encrypted.");
    } else {
      res.status(401).json({
        message: "Password and password confirmation are not the same.",
      });
      console.log("Password and password confirmation are not the same.");
      next();
    }
  } catch {
    res.status(500).json({
      message: "Something went wrong while trying to sign in a new user.",
    });
  }
});

router.get("/allUsers", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
    console.log("All Users in DB response was successful.");
  } catch {
    res.status(500).json({
      message: "Something went wrong while trying to send all Users.",
    });
  }
});

router.get("/userById/:id", async (req, res) => {
  try {
    const requestedUser = await User.findById(req.params.id);
    res.status(200).json(requestedUser);
    console.log("Requested user successfully sent.");
  } catch {
    res.status(500).json({
      message: "Something went wrong while trying to send a user by its id",
    });
  }
});

router.patch("/updateUsernameoremailById/:id", async (req, res) => {
  try {
    const password = req.body.password;
    if (typeof password !== "undefined") {
      res.status(401).json({
        message:
          "You cannot update password on this link, only username and email.",
      });
    } else {
      id = req.params.id;
      updatedbody = req.body;
      const options = { new: true };

      updatedUser = await User.findByIdAndUpdate(id, updatedbody, options);

      res.status(200).json(updatedUser);
      console.log("User was updated successfully.");
    }
  } catch {
    res.status(500).json({
      message: "Something went wrong while trying to update a user.",
    });
  }
});

router.delete("/deleteUserById/:id", async (req, res) => {
  try {
    id = req.params.id;
    const userToDelete = await User.findByIdAndDelete(id);
    res.send(`User with ${id} id, was successfully deleted.`);
    console.log("The user was deleted successfully.");
  } catch {
    res.status(500).json({
      message: "Something went wrong while trying to delete a user.",
    });
  }
});

router.post("/usersLogIn", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!email || !password) {
      res.status(400).json({
        message: "Please provide email or password",
      });

      next();
    }

    if (!user || !(await user.correctPassword(password, user.password))) {
      res.status(401).json({
        message: "Incorrect email or password",
      });
    } else {
      const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      res.status(200).json({
        message: "Logged in successfully.",
        token,
      });

      console.log("User logged in successfully.");
    }
  } catch {
    res.status(500).json({
      message: "Something went wrong while trying to log in a user.",
    });
  }
});

router.post("/forgotPassword", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(400).json({
        message: "Incorrect email. Please provide a valid email.",
      });
      next();
    } else {
      const resetToken = user.createPasswordResetToken();
      await user.save({ validateBeforeSave: false });

      const resetURL = `${req.protocol}://${req.get(
        "host"
      )}/bookstore/users/resetPassword/${resetToken}`;
      console.log(`Reset URL: ${resetURL}`);

      const message = `Please submit a PATCH request with your new password and password confirm to ${resetURL}`;
      console.log(message);
    }
    try {
      await sendEmail({
        email: user.email,
        subject: "Your password reset token (valid for 10 minutes)",
        message,
      });

      res.status(200).json({
        status: "success",
        message: "Token sent to email",
      });
    } catch (err) {
      await user.save({ validateBeforeSave: false });

      res.status(500).json({
        message:
          "There was an error while trying to send email. Please try again later.",
      });

      next();
    }
  } catch {
    res.status(500).json({
      message: "Something went wrong in the forgot password endpoint.",
    });
  }
});

router.patch("/resetPassword/:token", async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  try {
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400).json({
        message: "Token is invalid or it has expired.",
      });
      next();
    } else {
      user.password = req.body.password;
      user.passwordConfirm = req.body.passwordConfirm;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;

      await user.save();

      const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      res.status(200).json({
        message: "Password reset was successful.",
        token,
      });

      console.log("The password was reset successfully");
    }
  } catch {
    res.status(500).json({
      message: "Something went wrong while trying to reset a user's password.",
    });
  }
});

module.exports = router;
