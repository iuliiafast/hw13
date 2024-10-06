import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Publisher from './models/Publisher.js';
import Magazine from './models/Magazine.js';
import Tag from './models/Tag.js';
import Article from './models/Article.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/publishers', async (req, res) => {
  try {
    const publisher = new Publisher(req.body);
    await publisher.save();
    res.status(201).json(publisher);
  } catch (error) {
    res.status(400).json({ error: "Failed to create publisher" });
  }
});

app.post('/magazines', async (req, res) => {
  try {
    const magazine = new Magazine(req.body);
    await magazine.save();
    res.status(201).json(magazine);
  } catch (error) {
    res.status(400).json({ error: "Failed to create magazine" });
  }
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.error('Error connecting to MongoDB:', error));

app.get('/', (req, res) => {
  res.send('Hello, Mongoose!');
});