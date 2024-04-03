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

    gender: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const UserModel = mongoose.model("Career_user", UserSchema);
export default UserModel;
