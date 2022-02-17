import express from 'express';
import List from '../models/List.js';
import verify from '../verifyToken.js';
const router = express.Router();

// CREATE 
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body)
    try {
      const savedList = await newList.save()
      res.status(201).json(savedList)
    } catch (error) {
      res.status(500).json(error.message)
      console.log("error3");
    }
  } else {
    res.status(403).json("You are not allowed!")
  }
})

//UPDATE
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body
        },
        { new: true });
      res.status(200).json(savedMovie)
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.status(403).json("You ar not allowed to update movies!")
  }
})
// DELETE 
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id)
      res.status(201).json("The list has been deleted")
    } catch (error) {
      res.status(500).json(error.message)
      console.log("error3");
    }
  } else {
    res.status(403).json("You are not allowed!")
  }
})

//GET ALL
//if "/?new=true" , will return only 10 new users
router.get("/", verify, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = []

  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } }
        ])
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } }
        ])
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }

    res.status(200).json(list.reverse())
  } catch (error) {
    res.status(500).json(error)
  }
})

export default router;

