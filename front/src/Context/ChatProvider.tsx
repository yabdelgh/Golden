import { createContext, ProviderProps, useContext } from "react";

const ChatContext = createContext(null);

const ChatProvider = ({children}: ProviderProps<unknown>) => {
    return <ChatContext.Provider value={null}>{children}</ChatContext.Provider>
}

export const ChatState = () => {
    return useContext(ChatContext);
}

export default ChatProvider;