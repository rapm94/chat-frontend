import { RiCloseLine } from "react-icons/ri";
import { useState } from "react";
import { createGroup } from "../services/messaging";

export const NewChatModal = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const enterName = (e) => {
    const nameData = e.target.value;
    setName(nameData);
  };
  const enterDescription = (e) => {
    const descriptionData = e.target.value;
    setDescription(descriptionData);
  };

  const handleNewChatSubmit = async (e) => {
    e.preventDefault();
    const newGroup = await createGroup(name, props.user.id);
    setName("");
    setDescription("");
    props.setGroups([...props.groups, newGroup]);
    props.setShowModal(!props.showModal);
  };
console.log(name);
  return (
    <div className={`newChatModal ${props.showModal ? "show" : ""}`}>
      <div className="newChatModal__content">
        <div className="newChatModal__header">
          <h2>New Chat</h2>
          <button onClick={() => props.setShowModal(!props.showModal)}>
            <RiCloseLine />
          </button>
        </div>
        <form onSubmit={(e) => handleNewChatSubmit(e)}>
          <div className="newChatModal__body">
            <div className="newChatModal__body__input">
              <input
                type="text"
                placeholder="Enter chat name"
                value={name}
                onChange={(e) => enterName(e)}
              />
            </div>
            <div className="newChatModal__body__input">
              <input
                type="text"
                placeholder="Enter chat description"
                value={description}
                onChange={(e) => enterDescription(e)}
              />
            </div>
            <div className="newChatModal__body__button">
              <button onClick={() => props.setShowModal(!props.showModal)}>
                Cancel
              </button>
              <button type="submit">Create Chat</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
