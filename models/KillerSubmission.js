import mongoose from "mongoose";

const KillerSubmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.KillerSubmission ||
  mongoose.model("KillerSubmission", KillerSubmissionSchema);
