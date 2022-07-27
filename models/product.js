import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  stage: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Project", projectSchema);
