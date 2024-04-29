import mongoose from "mongoose";

const organizationDBSchema = new mongoose.Schema({
  quarter: String,
  depart: [
    {
      name: String,
      team: [
        {
          name: String,
        },
      ],
    },
  ],
});

const Organization = mongoose.model(
  "Organization",
  organizationDBSchema,
  "organizationDB"
);

export default Organization;
