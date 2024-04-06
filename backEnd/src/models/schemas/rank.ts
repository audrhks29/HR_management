import mongoose from 'mongoose';

const rankDBSchema = new mongoose.Schema({
  id: Number,
  rank: String,
  order: Number
});

const Rank = mongoose.model('Rank', rankDBSchema, 'rankDB');

export default Rank;