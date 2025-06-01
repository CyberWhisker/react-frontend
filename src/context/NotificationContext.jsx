import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { timeAgo } from "../../utils/timeAgo";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const { auth } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    const handleGetData = async () => {
        if (!auth?._id) return;
        setLoading(true);
        const error = true
        if (!error) {
            const formattedData = data.map((item) => ({
                sender: item.senderDetails._id,
                id: item._id,
                title: item.senderDetails.firstname + ' ' + item.senderDetails.lastname,
                message: item.latestUnreadMessage.text || "Sent an Image",
                unread: true,
                timestamp: timeAgo(item.latestUnreadMessage.createdAt),
                type: 'message',
            }));
            setMessages(formattedData);
            setTotal(formattedData.length);
        }
        setLoading(false);
    };

    useEffect(() => {
        handleGetData();
    }, [auth?._id]);

    return (
        <NotificationContext.Provider value={{ messages, total, loading, handleGetData }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
