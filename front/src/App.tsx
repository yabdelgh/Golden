import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";
import { ChatState } from "./Context/ChatProvider";
import { useEffect } from "react";
import { errorToast, successToast } from "./Utils/Toast";

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
  } = ChatState();

  useEffect(() => {
    document.addEventListener("visibilitychange", () => {
      setIsOnline((value: boolean) => {
        socket.emit('isOnline', !value);
        return !value;
      });
    });
    socket.on("isOnline", (payload: any) => { 
      setUsers((value: any) => {
        if (value !== undefined)
        {
          const index = value.findIndex((ele: any) => ele.id === payload.userId)
          value[index].isOnline = payload.status;
        }
        return [...value];
      })
      console.log(payload);
    });
    socket.on("me", (payload: any) => setUser(payload));
    socket.on("rooms", (payload: any) => {
      setRooms(payload);
    });
    socket.on("users", (payload: any) => {
      setUsers(payload)
    });
    socket.on("addRoom", (payload: any) => {
      setRooms((value: any) => [...value, payload]);
      successToast(toast, 'new group added')
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
      })
      successToast(toast, 'group chat deleted successfully')
    }); 
    socket.on("updateRoom", (payload: any) => {
      setRooms((rooms: any[]) => {
        const index = rooms.findIndex((ele: any) => {
          return ele.id === payload.id;
        });
        rooms.splice(index, 1, payload);
            setSelectedRoom((value: any) => { 
              if (value !== undefined && value.id === payload.id)
                return payload;
              return value;
          });
        return [...rooms];
      });
      successToast(toast, 'group name updated successfully')
    });
    
    socket.on('chatMsg', (payload: any) => { 
      setMsgs((value: any) => { 
        return [...value, payload];
      });
    });

    socket.on("error", (error: string) => errorToast(toast, error));
    return () => {
      socket.off("me");
      socket.off("rooms");
      socket.off("users");
      socket.off("error");
      socket.off("addRoom");
      socket.off("deleteRoom");
      socket.off("updateRoom");
      socket.off("chatMsg");
      socket.off("isOnline");

    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
