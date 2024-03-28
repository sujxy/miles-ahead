import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    current_education: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    report1_desc: {
      type: String,
      required: false,
    },
    report2_desc: {
      type: String,
      required: false,
    },
    report3_desc: {
      type: String,
      required: false,
    },
    scores: {
      E: {
        type: Number,
      },
      A: {
        type: Number,
      },
      I: {
        type: Number,
      },
      R: {
        type: Number,
      },
      C: {
        type: Number,
      },
      S: {
        type: Number,
      },
    },
  },
  { timestamps: true },
);

const UserModel = mongoose.model("Career_user", UserSchema);
export default UserModel;
