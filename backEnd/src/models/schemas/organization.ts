import mongoose from 'mongoose';

const organizationDBSchema = new mongoose.Schema({
  id: Number,
  quarter: String,
  depart: {
    id: Number,
    name: String,
    team: {
      id: Number,
      name: String
    }
  }
});

const Organization = mongoose.model('Organization', organizationDBSchema, 'organizationDB');

export default Organization;