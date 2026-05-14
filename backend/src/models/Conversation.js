import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    diagnosis: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const conversationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      default: "New consultation",
    },
    messages: [messageSchema],
    lastSeverity: {
      type: String,
      enum: ["SELF_CARE", "CONSULT_GP", "URGENT", "EMERGENCY"],
      default: "SELF_CARE",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", conversationSchema);
