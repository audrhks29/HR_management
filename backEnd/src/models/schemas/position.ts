import mongoose from "mongoose";

const positionDBSchema = new mongoose.Schema({
  id: Number,
  name: String
})

const Position = mongoose.model('Position', positionDBSchema, 'positionDB');

export default Position;