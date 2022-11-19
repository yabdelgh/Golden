import { useToast } from "@chakra-ui/react";
import io from "socket.io-client";
import { createContext, useContext, useState } from "react";
 
/* 
  const [msgs, setMsgs]= useState([]);
  const [roomMsgs, setRoomMsgs] = useState();
  const [roomUsers, setRoomUsers] = useState();
  const toast = useToast();
*/

const socket = io("http://localhost:3333/chat",{ withCredentials: true });

const ChatContext = createContext<any | null>(null);

const ChatProvider = ({ children }: any) => {
  const [user, setUser] : any= useState({});
  const [users, setUsers]: any= useState([]);
  const [rooms, setRooms]: any = useState([]);
  const [msgs, setMsgs]: any = useState([]);
  const [selectedRoom, setSelectedRoom] = useState();
  const [usersList, setUsersList] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const toast = useToast();
  

  return (
    <ChatContext.Provider
      value={{
        isOnline,
        setIsOnline,
        msgs,
        setMsgs,
        toast,
        user,
        socket,
        setUser,
        users,
        setUsers,
        rooms,
        setRooms,
        selectedRoom,
        setSelectedRoom,
        usersList,
        setUsersList,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
