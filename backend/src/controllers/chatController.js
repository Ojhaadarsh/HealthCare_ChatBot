import Conversation from "../models/Conversation.js";
import { getDiagnosis } from "../services/diagnosisService.js";
import {
  detectEmergency,
  getEmergencyResponse,
} from "../services/safetyService.js";

export const sendMessage = async (req, res) => {
  try {
    const { message, conversationId } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ message: "Message is required" });
    }

    let conversation;
    if (conversationId) {
      conversation = await Conversation.findOne({
        _id: conversationId,
        user: req.user._id,
      });
      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }
    } else {
      conversation = await Conversation.create({
        user: req.user._id,
        title: message.slice(0, 50) + (message.length > 50 ? "..." : ""),
        messages: [],
      });
    }

    conversation.messages.push({
      role: "user",
      content: message,
    });

    const { isEmergency, isMentalHealth } = detectEmergency(message);
    let diagnosis;

    if (isEmergency) {
      diagnosis = getEmergencyResponse(isMentalHealth);
    } else {
      const history = conversation.messages.slice(0, -1).map((m) => ({
        role: m.role,
        content: m.role === "assistant" && m.diagnosis ? m.diagnosis.reply : m.content,
      }));
      diagnosis = await getDiagnosis(message, history);
    }

    conversation.messages.push({
      role: "assistant",
      content: diagnosis.reply,
      diagnosis,
    });
    conversation.lastSeverity = diagnosis.severity;

    await conversation.save();

    return res.json({
      conversationId: conversation._id,
      diagnosis,
    });
  } catch (err) {
    console.error("sendMessage error:", err);
    return res.status(500).json({ message: err.message });
  }
};

export const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({ user: req.user._id })
      .select("title lastSeverity createdAt updatedAt")
      .sort({ updatedAt: -1 })
      .limit(50);
    res.json(conversations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    res.json(conversation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteConversation = async (req, res) => {
  try {
    const result = await Conversation.deleteOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    res.json({ message: "Conversation deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
