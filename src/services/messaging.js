import axios from "axios";
import { getHostedServer } from "../config";

export const createGroup = async (groupName, userId) => {
  const response = await axios.post(getHostedServer() + "/api/chat", {
    groupName,
    groupCreator: userId,
  });
  return response.data;
};

export const getAllGroups = async () => {
  const response = await axios.get(getHostedServer() + "/api/chat");
  return response.data.groups;
};

export const sendMessage = async (message, group, userId) => {
  const response = await axios.post(
    getHostedServer() + `/api/chat/${group._id}/message`,
    {
      message,
      sender: userId,
    }
  );
  return response;
};

export const getAllMessages = async (groupId) => {
  const response = await axios.get(
    getHostedServer() + `/api/chat/${groupId}/message`
  );
  return response.data;
};
