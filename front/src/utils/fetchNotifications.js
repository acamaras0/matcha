import axios from "axios";

const fetchNotifications = (userId, cookie, setNotifications, setMessages) => {
    if (cookie !== "") {
      const getNotifications = async () => {
        const response = await axios.get(
          `http://localhost:5000/user/notifications/${userId}`,
          {}
        );
        setNotifications(response.data);
      };
      getNotifications();
    }
  
    if (cookie !== "") {
      const getMessagesNotif = async () => {
        const response = await axios.get(
          `http://localhost:5000/messages/notif/${userId}`,
          {}
        );
        setMessages(response.data);
      };
      getMessagesNotif();
    }
  
    return () => {
      setNotifications({});
      setMessages({});
    };
  };

  export default fetchNotifications;