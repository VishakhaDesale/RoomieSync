import { useState, useEffect } from 'react';
import axios from 'axios';

const Notification = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [pId, setPId] = useState("");

  const user = userId.replace(/[\[\]]/g, "");
  

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/notifications/${user}`);
        setNotifications(response.data); 
        setPId(response.data.userId);
        console.log('Notifications fetched:', response.data); 
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    };

    fetchNotifications(); 

    const interval = setInterval(fetchNotifications, 3000);

    return () => clearInterval(interval);
  }, [userId]); 

  return (
    <div className="text-slate-950 border-2 p-6 gap-2 flex flex-col m-2">
      <h3 className="font-semibold">Notifications:</h3>
      {notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        notifications.map((notification, index) => {
          console.log(notification.message); 
          return (
            <div key={index} className="border-2 p-2 rounded">
              <strong>Message:</strong> {notification.message} Rs. <br />
              <strong>To User:</strong> {notification.userId} <br />
              <strong>Notification ID:</strong> {notification.id} <br />
            </div>
          );
        })
      )}
    </div>
  );
};

export default Notification;
