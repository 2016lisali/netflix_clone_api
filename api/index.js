
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js'
import express from 'express';
import userRoutes from './routes/users.js';
import movieRoutes from './routes/movies.js';
import listRoutes from './routes/lists.js';

const app = express();
dotenv.config();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/lists", listRoutes);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connect to DB Successfully!")
    app.listen(5000, () => {
      console.log("Backend server is running on port 5000!")
    })
  })
  .catch(err => console.log(err));

