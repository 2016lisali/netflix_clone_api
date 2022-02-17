import express from 'express';
import Movie from '../models/Movie.js';
import verify from '../verifyToken.js';
const router = express.Router();

// CREATE 
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body)
    try {
      const savedMovie = await newMovie.save()
      res.status(201).json(savedMovie)
    } catch (error) {
      res.status(500).json(error)
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
//DELETE
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("The movie has been deleted")
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.status(403).json("You ar not allowed to delete movies!")
  }
})

//GET
router.get("/find/:id", async (req, res) => {

  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie)
  } catch (error) {
    console.log("somethingwrong 2")
    res.status(500).json(error)
  }
})

//GET RANDOM MOVIE
router.get("/random", async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ])
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ])
    }
    res.status(200).json(movie)
  } catch (error) {
    console.log("somethingwrong 2")
    res.status(500).json(error)
  }
})
//GET ALL
//if "/?new=true" , will return only 10 new users
router.get("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const movies = await Movie.find();
      res.status(200).json(movies.reverse())
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.status(403).json("You ar not allowed to see all users!")
  }
})

export default router;

