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
        default: 0,
      },
      I: {
        type: Number,
        default: 0,
      },
      A: {
        type: Number,
        default: 0,
      },
      S: {
        type: Number,
        default: 0,
      },
      E: {
        type: Number,
        default: 0,
      },
      C: {
        type: Number,
        default: 0,
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
  { timestamps: true },
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
      default: {
        job: 0,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);
const Report2Model = mongoose.model("Career_report2", Reoprt2Schema);

export { Report1Model, Report2Model };
