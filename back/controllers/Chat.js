import Chat from "../models/ChatModel.js";
import Message from "../models/MessageModel.js";
import Matches from "../models/MatchModel.js";
import Users from "../models/UserModel.js";
import { Op } from "sequelize";

export const newConversation = async (req, res) => {
  const user1 = req.body.senderId;
  const user2 = req.body.receiverId;
  const check = await Matches.findAll({
    where: { match_status: 1 },
  });
  try {
    const convos = await Chat.create({ user1: user1, user2: user2 });
    res.status(200).json(convos);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getConversation = async (req, res) => {
  const userId = req.params.userId;
  try {
    const convos = await Chat.findAll({
      where: {
        [Op.or]: [{ user1: userId }, { user2: userId }],
      },
    });
    res.status(200).json(convos);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const newMessages = async (req, res) => {
  const chat_id = req.body.chat_id;
  const sender = req.body.sender;
  const text = req.body.text;
  try {
    const message = await Message.create({ chat_id, sender, text });
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getMessages = async (req, res) => {
    const chat_id = req.params.chat_id;
    try {
        const messages = await Message.findAll({
        where: {
            chat_id,
        },
        });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }};
