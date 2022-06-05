import { IoMdLogOut } from "react-icons/io";
import { IoChatbubbleSharp } from "react-icons/io5";
import { MdAddCircle } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaPhone, FaCog } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";

import { Outlet, useNavigate } from "react-router";
import { useState, useEffect } from "react";

import { io } from "socket.io-client";
import { ToastContainer } from "react-toastify";
import { logoutUser } from "../../services/users";
import { NewChatModal } from "../NewChatModal";
import { ChatTab } from "../ChatTab";
import { useQuery } from "react-query";
import { getAllGroups } from "../../services/messaging";
import { getHostedServer } from "../../config";
export const ChatPage = () => {
  const [groups, setGroups] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  useQuery("getAllGroups", getAllGroups, {
    onSuccess: (data) => {
      setGroups(data);
    },
  });


const connectToSocket = () => {
  const socket = io(getHostedServer());
}

useEffect(() => {
  connectToSocket();
}
, []);


  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <>
      <div className={`chatDashboard ${toggleMenu ? "toggle" : ""}`}>
        <div className="chatHeadBar">
          <div className="chatHeadBar__controls">
            <div className="imageBackground">
              <img
                src="https://avatars.dicebear.com/api/human/:seed.svg"
                alt="profile-pic"
              />
            </div>

            <button
              onClick={() => {
                setToggleMenu(!toggleMenu);
              }}
            >
              <GiHamburgerMenu className="menu" />
            </button>
            <button
              onClick={() => {
                setShowModal(!showModal);
              }}
            >
              <MdAddCircle className="addGroup" />
            </button>
          </div>
          <div className="chatHeadBar__chatInfo">
            <img
              src="https://avatars.dicebear.com/api/human/tyhert.svg"
              alt="profile-pic"
            />
            <h2>{/**TODO: get the name of the chat**/}</h2>

            <button
              onClick={() => {
                logoutUser(user.email);
                navigate("/login");
              }}
            >
              <IoMdLogOut />
            </button>
          </div>
        </div>

        <div className="chatMain">
          <div className="chatSideButtons">
            <button>
              <IoChatbubbleSharp />
            </button>
            <button>
              <HiUserGroup />
            </button>
            <button>
              <FaPhone />
            </button>
            <button>
              <FaCog />
            </button>
          </div>
          <div className="chatList">
            {groups.map((group, index) => (
              <ChatTab key={index} user={user} group={group} handleChatChange={handleChatChange} />
            ))}
          </div>

          <div className="chat">
            <Outlet context={[user, currentChat]} />
          </div>
        </div>
        <ToastContainer />
        <NewChatModal
          showModal={showModal}
          setShowModal={setShowModal}
          user={user}
        />
      </div>
    </>
  );
};
