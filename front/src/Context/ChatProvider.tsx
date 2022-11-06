import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ChatContext = createContext<any | null>(null);

const ChatProvider = ({ children }: any) => {
  const [user, setUser] = useState({});
  const [chats, setChats] = useState({});
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState();

  const Navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/user/me")
      .then((data) => setUser(data.data))
      .catch(() => Navigate("/"));
    axios
      .get("/api/chat/rooms")
      .then((data) => setRooms(data.data))
      .catch(() => { Navigate('/')});
   /* 
    axios
      .get("/api/chat/msg")
      .then((data) => setRooms(data.data))
      .catch(() => console.log("error"));
    */
  }, [Navigate]);

  return (
    <ChatContext.Provider
      value={{ user, setUser, rooms, setRooms, selectedRoom, setSelectedRoom }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
