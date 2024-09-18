import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

const leadSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      private: true,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
);

// add plugin that converts mongoose to json
leadSchema.plugin(toJSON);

export default mongoose.models.Lead || mongoose.model("Lead", leadSchema);
