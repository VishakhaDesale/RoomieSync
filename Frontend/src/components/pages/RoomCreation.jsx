import { useState } from "react";
import axios from "axios";
import { CheckCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Clipboard } from "lucide-react";

import { useNavigate } from "react-router-dom";

const RoomCreation = ({ userId }) => {
  const [roomName, setRoomName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [admin, setAdmin] = useState("");
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleRoomCreation = async () => {
    if (!roomName.trim()) {
      // Check if roomName is empty or just whitespace
      setMessage("Enter Room Name!!"); // Show an error message
      return; // Exit the function without proceeding to API call
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/rooms/create",
        null,
        {
          params: {
            roomName: roomName,
            userId: userId,
          },
        }
      );
      const code = response.data.inviteCode;

      localStorage.setItem("room", JSON.stringify(response.data.id));

      console.log(response);
      setInviteCode(code);
      setAdmin(response.data.userIds);

      setMessage(`${code}`);
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
        navigate("/");
      }, 3000);
    } catch (error) {
      setMessage("Error creating room");
    }
  };

  // Function to copy invite code to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteCode);
    setMessage("Invite code copied to clipboard!");
  };

  // Function to share invite code via WhatsApp
  const shareViaWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=Join%20my%20room%20using%20this%20invite%20code:%20${inviteCode}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="flex flex-col items-center space-y-4 relative">
      <input
        type="text"
        placeholder="Enter room name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        onClick={handleRoomCreation}
        className="border mt-4 p-3 rounded-lg bg-radial-gradient from-[#28206C] to-[#28206C]/0 to-70%"
      >
        Create Room
      </button>

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white border-2 border-green-500 shadow-lg p-4 rounded-xl flex flex-col space-y-4 items-center min-w-[300px] min-h-[250px]">
            <div className="flex-shrink-0">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Successfully created!
              </h3>
              <h2 className="text-lg font-semibold text-gray-900 py-2">
                Invite code :{" "}
              </h2>
              <p className="text-gray-600">{message}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={copyToClipboard}
              >
                <Clipboard className="h-6 w-6 text-gray-600 hover:text-gray-800" />
                <span className="text-gray-700">Copy Invite Code</span>
              </div>

              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={shareViaWhatsApp}
              >
                <FaWhatsapp className="h-6 w-6 text-green-500 hover:text-green-700" />
                <span className="text-gray-700">Share on WhatsApp</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {!showPopup && message && (
        <p
          className={`text-sm ${
            message.includes("successfully") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default RoomCreation;
