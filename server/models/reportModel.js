import mongoose from "mongoose";

//report 1 schema
const Reoprt1Schema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Career_user",
    },
    chat_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Career_chat",
    },
    scores: {
      R: {
        type: Number,
        required: true,
      },
      I: {
        type: Number,
        required: true,
      },
      A: {
        type: Number,
        required: true,
      },
      S: {
        type: Number,
        required: true,
      },
      E: {
        type: Number,
        required: true,
      },
      C: {
        type: Number,
        required: true,
      },
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
const Report1Model = mongoose.model("Career_report1", Reoprt1Schema);


//report 2 schema
const Reoprt2Schema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Career_user",
    },
    chat_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Career_chat",
    },
    content: {
      type: String,
      required: true,
    },
    userOptions: {
      type: Map,
      of: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
const Report2Model = mongoose.model("Career_report2", Reoprt2Schema);

export { Report1Model, Report2Model };
