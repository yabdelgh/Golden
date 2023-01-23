import { useToast } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
 

const AppContext = createContext<any | null>(null);

const AppProvider = ({ children }: any) => {

  const [socket, setSocket]: any = useState(undefined);
  const [user, setUser]: any = useState({});
  const [challenges, setChallenges] = useState([]); 
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
  const [isSmallerThan1200, setIsSmallerThan1200] = useState(false);
  const [isSmallerThan1800, setIsSmallerThan1800] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsSmallerThan1200(window.innerWidth < 1720);
      setIsSmallerThan1800(window.innerWidth < 2120);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <AppContext.Provider
      value={{
        isSmallerThan1200,
        isSmallerThan1800,
        challenges,
        setChallenges,
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
