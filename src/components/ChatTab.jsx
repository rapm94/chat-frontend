import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { getHostedServer } from "../config";

export const ChatTab = ({ handleChatChange, group, user }) => {


  const changeCurrentChat = (group) => {
    handleChatChange(group);
  };

  return (
    <Link to={`chat/${group._id}`} className="linkTab">
      <div className="chatTab" onClick={() => changeCurrentChat(group)}>
        <div className="chatTab__avatar">
          <img src={group.groupAvatar} alt="profile-pic" />
        </div>
        <div className="chatTab__content">
          <h2>{group.groupName}</h2>
        </div>
        <div className="chatTab__sentTime">{group.groupTime}</div>
      </div>
    </Link>
  );
};
