import { useToast } from "@chakra-ui/react";
import io from "socket.io-client";
import { createContext, useContext, useState } from "react";
 
const socket = io("http://localhost:3333/chat",{ withCredentials: true, reconnection: true });

const AppContext = createContext<any | null>(null);

const AppProvider = ({ children }: any) => {

  const [user, setUser]: any = useState({});
  const [users, setUsers]: any = useState([]);
  const [rooms, setRooms]: any = useState([]);
  const [Friends, setFriends]: any = useState([]);
  const [msgs, setMsgs]: any = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [dMRooms, setDMRooms]: any = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [selectedRoom, setSelectedRoom] = useState();
  const [usersList, setUsersList] = useState(false);
  const [showUP, setShowUP] = useState(undefined);
  const [isOnline, setIsOnline] = useState(true);
  const toast = useToast();
  

  return (
    <AppContext.Provider
      value={{
        dMRooms,
        setDMRooms,
        Friends,
        setFriends,
        showUP,
        setShowUP,
        selectedUser,
        setSelectedUser,
        searchKey,
        setSearchKey,
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
    </AppContext.Provider>
  );
};

export const AppState = () => {
  return useContext(AppContext);
};

export default AppProvider;
