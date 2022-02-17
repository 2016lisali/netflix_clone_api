import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import verify from '../verifyToken.js';
const router = express.Router();

//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = bcrypt.hash(req.body.password, 12)
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body
        },
        { new: true });
      res.status(200).json(updatedUser)
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.status(403).json("You can update only your account!")
  }
})
//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...")
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.status(403).json("You can delete only your account!")
  }
})
//GET
router.get("/find/:id", async (req, res) => {
  console.log(req.params.id)
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    console.log(user)
    console.log(user._doc)
    res.status(200).json(info)
  } catch (error) {
    console.log("somethingwrong 1")
    res.status(500).json(error)
  }
})
//GET ALL
// if "/?new=true" , will return only 10 new users
router.get("/", verify, async (req, res) => {
  const query = req.query.new;

  if (req.user.isAdmin) {
    try {
      const users = query ? await User.find().sort({ _id: -1 }).limit(10) : await User.find();
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.status(403).json("You ar not allowed to see all users!")
  }
})
//GET USER STATS
router.get("/stats", async (req, res) => {
  const today = new Date();
  const latYear = today.setFullYear(today.setFullYear() - 1)
  console.log(latYear)
  const monthArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ]

  try {
    // aggregate registered users per month
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" }
        }
      }, {
        $group: {
          _id: "$month",
          total: { $sum: 1 }
        }
      }
    ]);
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error)
  }
})
export default router;
