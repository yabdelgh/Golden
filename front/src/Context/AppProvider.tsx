import { useToast } from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import { BlockedUser } from "../../types";

const AppContext = createContext<any | null>(null);

export type AppStateType = {
  socket: any;
  setSocket: React.Dispatch<React.SetStateAction<any>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  challenges: any[];
  setChallenges: React.Dispatch<React.SetStateAction<any[]>>;
  users: any[];
  setUsers: React.Dispatch<React.SetStateAction<any[]>>;
  rooms: any[];
  setRooms: React.Dispatch<React.SetStateAction<any[]>>;
  Friends: any[];
  setFriends: React.Dispatch<React.SetStateAction<any[]>>;
  msgs: any[];
  setMsgs: React.Dispatch<React.SetStateAction<any[]>>;
  searchKey: string;
  setSearchKey: React.Dispatch<React.SetStateAction<string>>;
  searchs: any[];
  setSearchs: React.Dispatch<React.SetStateAction<any[]>>;
  dMRooms: any;
  setDMRooms: React.Dispatch<React.SetStateAction<any>>;
  userProfile: any;
  setUserProfile: React.Dispatch<React.SetStateAction<any>>;
  roomProfile: any;
  setRoomProfile: React.Dispatch<React.SetStateAction<any>>;
  selectedRoom: any;
  setSelectedRoom: React.Dispatch<React.SetStateAction<any>>;
  usersList: boolean | undefined;
  setUsersList: any;
  showUP: any;
  setShowUP: React.Dispatch<React.SetStateAction<any>>;
  isOnline: boolean;
  setIsOnline: React.Dispatch<React.SetStateAction<boolean>>;
  toast: any;
  isSmallerThan1200: boolean;
  setIsSmallerThan1200: React.Dispatch<React.SetStateAction<boolean>>;
  isSmallerThan1800: boolean;
  setIsSmallerThan1800: React.Dispatch<React.SetStateAction<boolean>>;
  blockedUsers: BlockedUser[];
  setBlockedUsers: React.Dispatch<React.SetStateAction<BlockedUser[]>>;
  openEditProfile: boolean;
  setOpenEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppProvider = ({ children }: any) => {
  const [socket, setSocket] = useState<any>(undefined);

  const [user, setUser] = useState<any>({});
  const [challenges, setChallenges] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [rooms, setRooms] = useState<any[]>([]);
  const [Friends, setFriends] = useState<any[]>([]);
  const [msgs, setMsgs] = useState<any[]>([]);
  const [searchKey, setSearchKey] = useState("");
  const [searchs, setSearchs] = useState<any[]>([]);
  const [dMRooms, setDMRooms] = useState<any>([]);
  const [userProfile, setUserProfile] = useState<any>({});
  const [roomProfile, setRoomProfile] = useState<any>();
  const [selectedRoom, setSelectedRoom] = useState<any>();
  const [usersList, setUsersList] = useState<boolean | undefined>(false);
  const [showUP, setShowUP] = useState(undefined);
  const [isOnline, setIsOnline] = useState(true);
  const toast = useToast();
  const [isSmallerThan1200, setIsSmallerThan1200] = useState(false);
  const [isSmallerThan1800, setIsSmallerThan1800] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([]);
  const [openEditProfile, setOpenEditProfile] = useState(false);

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
        blockedUsers,
        setBlockedUsers,
        openEditProfile,
        setOpenEditProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const AppState = (): AppStateType => {
  return useContext(AppContext);
};

export default AppProvider;
