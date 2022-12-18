import { useEffect } from "react";
import { AppState } from "../Context/AppProvider";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { setSocket } = AppState();
  const navigate = useNavigate();

  useEffect(() => {
    setSocket(() =>
      io("http://localhost:3333/chat", {
        withCredentials: true,
        reconnection: true,
      })
    );
    navigate("/profile");
  });
  return <></>;
};

export default HomePage;
