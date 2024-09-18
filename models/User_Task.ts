import mongoose from "mongoose";
import toJSON from "./plugins/toJSON";

const userTaskSchema = new mongoose.Schema(
  {
    user_id: {
      type: String
    },
    task_id: {
      type: String
    }
  },
  {
    toJSON: { virtuals: true }
  }
);

userTaskSchema.plugin(toJSON);

const User_Task = mongoose.models.User_Task || mongoose.model("User_Task", userTaskSchema);

export default User_Task;
