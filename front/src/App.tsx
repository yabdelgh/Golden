import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import ChatPage from "./Pages/ChatPage";
import { AppState } from "./Context/AppProvider";
import { useEffect } from "react";
import { errorToast, successToast } from "./Utils/Toast";
import FriendsPage from "./Pages/FriendsPage";
import { Friend, Msg, User, Room, RoomUser } from "../types";
import NavBar from "./Components/NavBar/NavBar";
import ProfilePage from "./Pages/ProfilePage";
import GamePage from "./Pages/GamePage";
import WorldPage from "./Pages/WorldPage";
import TwoFAPage from "./Pages/TwoFAPage";
import { Box } from "@chakra-ui/react";
import SecurityPage from "./Pages/SecurityPage";
import HomePage from "./Pages/HomePage";

function App() {
  const {
    setIsOnline,
    setMsgs,
    setUser,
    setRooms,
    setUsers,
    socket,
    toast,
    setUsersList,
    setSelectedRoom,
    setFriends,
    setSearchs
  } = AppState();

  useEffect(() => {

    if (!socket)
      return;

    document.addEventListener("visibilitychange", () => {
      setIsOnline((value: boolean) => {
        socket.emit("isOnline", !value);
        return !value;
      });
    });

    socket.on("me", (payload: User) => setUser(payload));

    socket.on("isOnline", (payload: User) => {
      setUsers((value: User[]) => {
        const index = value.findIndex((ele: User) => ele.id === payload.id);
        if (index !== -1) value[index].isOnline = payload.isOnline;
        return [...value];
      });
    });

    socket.on("users", (payload: User[]) => {
      setUsers(payload);
    });

    socket.on("rooms", (payload: Room[]) => {
      for (const ele of payload) ele.isGroupChat = true;
      setRooms((value: Room[]) => [...value, ...payload]);
    });

    socket.on("dMRooms", (payload: Room[]) => {
      for (const ele of payload) ele.isGroupChat = false;
      setRooms((value: Room[]) => [...value, ...payload]);
    });

    socket.on("addRoom", (payload: Room) => {
      payload.isGroupChat = true;
      setRooms((value: Room[]) => [...value, payload]);
      successToast(toast, "new group added");
    });

    socket.on("deleteRoom", (payload: any) => {
      setRooms((rooms: any[]) => {
        const index = rooms.findIndex((ele: any) => {
          return ele.id === payload.id;
        });
        rooms.splice(index, 1);
        return [...rooms];
      });
      setSelectedRoom((value: any) => {
        if (value === undefined || payload.id === value.id) {
          setUsersList(undefined);
          return undefined;
        }
        return value;
      });
      successToast(toast, "group chat deleted successfully");
    });

    socket.on("updateRoom", (payload: Room) => {
      setRooms((rooms: Room[]) => {
        const index = rooms.findIndex((ele: Room) => {
          return ele.id === payload.id;
        });
        rooms.splice(index, 1, payload);
        setSelectedRoom((value: Room) => {
          if (value !== undefined && value.id === payload.id) return payload;
          return value;
        });
        return [...rooms];
      });
      successToast(toast, "group name updated successfully");
    });

    socket.on("chatMsg", (payload: Msg) => {
      setMsgs((value: Msg[]) => {
        return [...value, payload];
      });
      setRooms((value: Room[]) => {
        const ret = value.findIndex((ele: Room) => {
          return ele.id === payload.roomId;
        });
        value[ret].lastMsg = payload.msg;
        return value;
      });
    });

    socket.on("friends", (payload: Friend[]) => {
      setFriends(payload);
    });

    socket.on("addFriend", (payload: Friend) => {
      setFriends((value: Friend[]) => {
        return [...value, payload];
      });
    });

    socket.on("acceptFriend", (payload: Friend) => {
      setFriends((value: Friend[]) => {
        const index: number = value.findIndex(
          (ele: Friend) =>
            ele.user1Id === payload.user1Id && ele.user2Id === payload.user2Id
        );
        value[index].status = true;
        return [...value];
      });
    });

    socket.on("removeFriend", (payload: Friend) => {
      setFriends((value: Friend[]) => {
        const index: number = value.findIndex((ele: Friend) => ele === payload);
        value.splice(index, 1);
        return [...value];
      });
    });

    socket.on('ban', (payload: {userId: number, roomId: number, val: boolean}) => { 
      setRooms((value: Room[]) => { 
        const ret = value.findIndex((ele: Room) => ele.id === payload.roomId);
        const ret2 = value[ret].RoomUsers.findIndex((ele: RoomUser) => ele.userId === payload.userId);
        value[ret].RoomUsers[ret2].ban = payload.val;
        return [...value];
      })
    })
    
    socket.on('mute', (payload: { userId: number, roomId: number , val: boolean}) => {
      setRooms((value: Room[]) => { 
        const ret = value.findIndex((ele: Room) => ele.id === payload.roomId);
        const ret2 = value[ret].RoomUsers.findIndex((ele: RoomUser) => ele.userId === payload.userId);
        value[ret].RoomUsers[ret2].mute = payload.val;
        return [...value];
      })
    })
    
    socket.on('role', (payload: { userId: number, roomId: number, role: string }) => { 
      setRooms((value: Room[]) => { 
        const ret = value.findIndex((ele: Room) => ele.id === payload.roomId);
        const ret2 = value[ret].RoomUsers.findIndex((ele: RoomUser) => ele.userId === payload.userId);
        value[ret].RoomUsers[ret2].role = payload.role;
        return [...value];
      })
    })
    
    socket.on('searchs', (payload: string[]) => { 
      setSearchs((value: string[]) => {
        return [...value, payload];
      })
    })

    socket.on("error", (error: string) => errorToast(toast, error));

    return () => {
      socket.removeAllListeners();
    };
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <Box className="App">
      <NavBar/>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/world" element={<WorldPage />} />
        <Route path="/TwoFa" element={<TwoFAPage />} />
        <Route path="/security" element={<SecurityPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Box>
  );
}

export default App;