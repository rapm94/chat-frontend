import { ChatBubble } from "./ChatBubble";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { RiSendPlaneFill } from "react-icons/ri";
import { getAllMessages, sendMessage } from "../services/messaging";
import { useOutletContext } from "react-router";
import {useQuery } from "react-query";

export const Chat = () => {
  const [inputData, setInputData] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentUser, currentChat] = useOutletContext();

  const scrollRef = useRef();

  const sendChatInput = (event) => {



    event.preventDefault();
    if (inputData.length > 0) {
      handleSendMessage(inputData);
      setInputData("");
    }
  };

  const handleSendMessage = async (message) => {

    const {data} = await sendMessage(message, currentChat, currentUser.id);
    const msgs = [...messages];
    console.log(data);
    msgs.push({ message: data.newMessage.message, sender: currentUser.id });
    setMessages(msgs);
  };

  useQuery(
    ["getAllMessages", currentChat],
    () => getAllMessages(currentChat._id),
    {
      onSuccess: (data) => {
        setMessages(data.messages);
      },
    }
  );

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="chat__content">
        {messages.map((message, index) => (
          <ChatBubble
            key={index}
            sender={message.sender === currentUser.id ? "sender" : ""}
            message={message.message}
            reference={scrollRef}
            senderName={message.name}
          />
        ))}
      </div>
      <div className="input__container">
        <form onSubmit={(event) => sendChatInput(event)}>
          <input
            type="text"
            placeholder="Type your message here"
            onChange={(e) => setInputData(e.target.value)}
            value={inputData}
          />
          <button type="submit">
            <RiSendPlaneFill />
          </button>
        </form>
      </div>
    </>
  );
};
