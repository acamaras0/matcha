import {
  markMessagesSeen,
  getChatBetweenUsers,
  createNewMessage,
  executeQuery,
} from "../queries/chat.js";

export const markSeen = async (req, res) => {
  const userId = req.params.id;
  const result = await markMessagesSeen(userId);
  return res.json(result);
};

export const getConversation = async (req, res) => {
  const userId = req.params.userId;
  const result = await getChatBetweenUsers(userId);
  return res.status(200).json(result);
};

export const newMessages = async (req, res) => {
  const chat_id = req.body.chat_id;
  const sender = req.body.sender;
  const receiver = req.body.receiver;
  const text = req.body.text;

  if (text.length > 499) {
    return console.log("Input too large");
  } else if (
    !text.match(
      /\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]/gi
    ) &&
    !text.match(/^\s+$|^$/gi) &&
    text !== ""
  ) {
    const result = await createNewMessage(chat_id, sender, receiver, text);
    return res.status(200).json(result);
  }
};

export const getMessages = async (req, res) => {
  const chat_id = req.params.chat_id;
  const query = `SELECT * FROM messages WHERE chat_id = ?`;
  await executeQuery(query, [chat_id], res);
};

export const getMessagesNotif = async (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM messages WHERE receiver = ? AND read_status = 0`;
  await executeQuery(query, [id], res);
};
