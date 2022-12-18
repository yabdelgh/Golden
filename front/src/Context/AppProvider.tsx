import { useToast } from "@chakra-ui/react";
import { createContext, useContext, useState } from "react";
 

const AppContext = createContext<any | null>(null);

const AppProvider = ({ children }: any) => {

  const [socket, setSocket]: any = useState(undefined);
  const [user, setUser]: any = useState({});
  const [users, setUsers]: any = useState([]);
  const [rooms, setRooms]: any = useState([]);
  const [Friends, setFriends]: any = useState([]);
  const [msgs, setMsgs]: any = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [searchs, setSearchs] = useState([]);
  const [dMRooms, setDMRooms]: any = useState([]);
  const [userProfile, setUserProfile]: any = useState({});
  const [roomProfile, setRoomProfile] = useState();
  const [selectedRoom, setSelectedRoom] = useState();
  const [usersList, setUsersList] = useState(false);
  const [showUP, setShowUP] = useState(undefined);
  const [isOnline, setIsOnline] = useState(true);
  const toast = useToast();

  return (
    <AppContext.Provider
      value={{
        socket,
        setSocket,
        userProfile,
        roomProfile,
        setUserProfile,
        setRoomProfile,
        searchs,
        setSearchs,
        dMRooms,
        setDMRooms,
        Friends,
        setFriends,
        showUP,
        setShowUP,
        searchKey,
        setSearchKey,
        isOnline,
        setIsOnline,
        msgs,
        setMsgs,
        toast,
        user,
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
