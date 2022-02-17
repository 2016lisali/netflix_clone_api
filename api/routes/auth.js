import bcrypt from 'bcrypt';
import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {

  try {
    const hashedpassword = await bcrypt.hash(req.body.password, 12)
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedpassword
    })
    // const user = await newUser.save();
    res.status(201).json(newUser);
  }
  catch (err) {
    res.status(500).json(err.message);
  }
})
//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    !user && res.status(401).json("Wrong password or username!")
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user?.password);
    !isPasswordCorrect && res.status(401).json("Wrong password or username")
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" })
    const { password, ...info } = user._doc;
    // do not send password
    res.status(200).json({ ...info, accessToken })
  } catch (error) {
    res.status(500).json(error.message)
  }
})
export default router;