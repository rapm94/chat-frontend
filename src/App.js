import { Routes, Route, Navigate } from "react-router";
import { LoginPage } from "./components/pages/LoginPage";
import { ChatPage } from "./components/pages/ChatPage";
import { Chat } from "./components/Chat";
import { MagicLinkPage } from "./components/pages/MagicLinkPage";
import { useEffect, useState } from "react";
import { loginUser, verifyToken } from "./services/users";
import "./components/styles/App.scss";

function App() {
  const [userEmail, setUserEmail] = useState("");
  const [userIsAuthenticated, setUserIsAuthenticated] = useState(false);

  const enterEmail = (e) => {
    const emailData = e.target.value;
    setUserEmail(emailData);
  };

  const emailSubmit = async (e) => {
    e.preventDefault();
    await loginUser(userEmail);
    setUserEmail("");
  };

  return (
    <Routes>
      <Route exact path="/" element={
          userIsAuthenticated ? <ChatPage /> : <Navigate to="/login" replace />
      }>
        <Route path="chat/:id" element={<Chat />} />
      </Route>

      <Route
        exact
        path="/login"
        element={
          <LoginPage
            enterEmail={enterEmail}
            emailSubmit={emailSubmit}
            userEmail={userEmail}
            setUserEmail={setUserEmail}
            setUserIsAuthenticated={setUserIsAuthenticated}
          />
        }
      />
      <Route exact path="/magic/:email/:link" element={<MagicLinkPage
        setAuthenticated={setUserIsAuthenticated}
       />} />

    </Routes>
  );
}

export default App;
