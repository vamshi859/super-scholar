import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  id: {
    type: Number,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  stage: {
    type: Number,
    require: true,
  },
});

export default mongoose.model("Project", projectSchema);
