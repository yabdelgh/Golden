import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import ChatPage from "./Pages/ChatPage";
import { AppState } from "./Context/AppProvider";
import { useEffect } from "react";
import { errorToast, successToast } from "./Utils/Toast";
import FriendsPage from "./Components/Profile/Profile";
import { Friend, Msg, User, Room, RoomUser } from "../types";
import NavBar from "./Components/NavBar/NavBar";
import ProfilePage from "./Pages/ProfilePage";
import GamePage from "./Pages/GamePage";
import WorldPage from "./Pages/WorldPage";
import TwoFAPage from "./Pages/TwoFAPage";
import { Box, useDisclosure } from "@chakra-ui/react";
import SecurityPage from "./Pages/SecurityPage";
import { io, Manager } from "socket.io-client";
import UseHere from "./Pages/UseHere";
import { validateHeaderValue } from "http";
import LoadingPage from "./Pages/LoadingPage";
import ChatHeader from "./Components/ChatHeader";

function App() {
  const {
    setUserProfile,
    user,
    setIsOnline,
    setMsgs,
    setUser,
    setRooms,
    setUsers,
    socket,
    setSocket,
    toast,
    setUsersList,
    setSelectedRoom,
    setFriends,
    setSearchs,
    setChallenges,
  } = AppState();
  const navigate = useNavigate();

  useEffect(() => {
    setSocket(() =>
      io("http://localhost:3333/chat", {
        withCredentials: true,
        reconnection: true,
      })
    );
  }, [setSocket]);

  useEffect(() => {
    if (!socket) return;
    socket.onAny((eventName: string, payload: any) => {
    });

    document.addEventListener("visibilitychange", () => {
      setIsOnline((value: boolean) => {
        socket.emit("isOnline", !value);
        return !value;
      });
    });

    socket.on("me", (payload: User) => { setUser(payload); setUserProfile(payload) });

    socket.on("inGame", (payload: any) => {
      setUser((value: User) => {
        if (value.id === payload.id) {
          navigate("/game");
          return { ...value, inGame: true };
        } else
          setUsers((value: User[]) => {
            const index = value.findIndex((ele: User) => ele.id === payload.id);
            if (index !== -1) value[index].inGame = payload.inGame;
            return [...value];
          });
        return value;
      });
    });

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

    socket.on("challenges", (payload: any) => {
      setChallenges(payload);
    });

    socket.on("addRoom", (payload: Room) => {
      setRooms((rooms: Room[]) => {
        const exist = rooms.some((ele: Room) => ele.id === payload.id);
        if (exist) return [...rooms];
        return [...rooms, payload];
      });
      setSelectedRoom(payload);
      navigate("/chat");
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

    socket.on("joinRoom", (payload: { roomId: number; user: User }) => {
      setUsers((users: User[]) => {
        const index = users.findIndex(
          (object) => object.id === payload.user.id
        );
        if (index === -1) return [...users, payload.user];
        return [...users];
      });
      setRooms((rooms: Room[]) => {
        const index = rooms.findIndex((object) => object.id === payload.roomId);
        const index2 = rooms[index].RoomUsers.findIndex(
          (object) => object.userId === payload.user.id
        );
        if (index2 === -1)
          rooms[index].RoomUsers.push({
            userId: payload.user.id,
            role: "User",
            ban: false,
            mute: false,
            status: "Member",
          });
        else rooms[index].RoomUsers[index2].status = "Member";
        return [...rooms];
      });
    });

    socket.on("leaveRoom", (payload: { roomId: number; userId: number }) => {
      setRooms((rooms: Room[]) => {
        const index1 = rooms.findIndex(
          (object) => object.id === payload.roomId
        );
        const index2 = rooms[index1].RoomUsers.findIndex(
          (object) => object.userId === payload.userId
        );
        rooms[index1].RoomUsers[index2].status = "ExMember";
        return [...rooms];
      });
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

    socket.on(
      "ban",
      (payload: { userId: number; roomId: number; val: boolean }) => {
        setRooms((value: Room[]) => {
          const ret = value.findIndex((ele: Room) => ele.id === payload.roomId);
          const ret2 = value[ret].RoomUsers.findIndex(
            (ele: RoomUser) => ele.userId === payload.userId
          );
          value[ret].RoomUsers[ret2].ban = payload.val;
          return [...value];
        });
      }
    );

    socket.on(
      "mute",
      (payload: { userId: number; roomId: number; val: boolean }) => {
        setRooms((value: Room[]) => {
          const ret = value.findIndex((ele: Room) => ele.id === payload.roomId);
          const ret2 = value[ret].RoomUsers.findIndex(
            (ele: RoomUser) => ele.userId === payload.userId
          );
          value[ret].RoomUsers[ret2].mute = payload.val;
          return [...value];
        });
      }
    );

    socket.on(
      "role",
      (payload: { userId: number; roomId: number; role: string }) => {
        setRooms((value: Room[]) => {
          const ret = value.findIndex((ele: Room) => ele.id === payload.roomId);
          const ret2 = value[ret].RoomUsers.findIndex(
            (ele: RoomUser) => ele.userId === payload.userId
          );
          value[ret].RoomUsers[ret2].role = payload.role;
          return [...value];
        });
      }
    );

    socket.on("searchs", (payload: string[]) => {
      setSearchs((value: string[]) => {
        return [...value, payload];
      });
    });

    socket.on("challenge", (payload: any) => {
      setChallenges((value: any) => [payload, ...value]);
    });

    socket.on("cancelChallenge", (payload: any) => {
      setChallenges((value: any) => {
        const newVal = value.filter(
          (ele: any) =>
            ele.challengerId !== payload.challengerId ||
            ele.challengedId !== ele.challengedId
        );
        return [...newVal];
      });
    });

    socket.on("declineChallenge", (payload: any) => {
      setChallenges((value: any) => {
        const newVal = value.filter(
          (ele: any) =>
            ele.challengerId !== payload.challengerId ||
            ele.challengedId !== ele.challengedId
        );
        return [...newVal];
      });
    });

    socket.on("error", (error: string) => errorToast(toast, error));
    socket.on("exception", (error: { status: string; message: string }) =>
      errorToast(toast, error.message)
    );

    socket.on("disconnect", () => {
      setUser({});
      navigate("/useHere");
    });

    return () => {
      socket.removeAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <Box className="App">
      <Routes>
        <Route
          path="/"
          element={user.login ? <ProfilePage /> : <LoginPage />}
        />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/useHere" element={<UseHere />} />
        <Route
          path="/chat"
          element={user.login ? <ChatPage /> : <LoginPage />}
        />
        <Route
          path="/friends"
          element={user.login ? <FriendsPage /> : <LoginPage />}
        />
        <Route
          path="/profile"
          element={user.login ? <ProfilePage /> : <LoginPage />}
        />
        <Route
          path="/game"
          element={user.login ? <GamePage /> : <LoginPage />}
        />
        <Route
          path="/world"
          element={user.login ? <WorldPage /> : <LoginPage />}
        />
        <Route path="/twoFa" element={<TwoFAPage />} />
        <Route
          path="/security"
          element={user.login ? <SecurityPage /> : <LoginPage />}
        />
      </Routes>
      <ChatHeader />
      <NavBar />
    </Box>
  );
}

export default App;
