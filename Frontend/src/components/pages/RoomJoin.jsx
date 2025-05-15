import { useState } from 'react';
import { CheckCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const RoomJoin = ({ userId }) => {
    const [inviteCode, setInviteCode] = useState('');
    const [message, setMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate(); 

    const handleJoinRoom = async () => {

        if (inviteCode.trim() == " ") { 
            setMessage("Enter Invite Code!!"); 
            return;
          }

        try {
            const response = await fetch(`http://localhost:8080/api/rooms/join`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inviteCode: inviteCode,
                    userId: userId
                }),
            });
        
            const data = await response.json();
        
            if (!response.ok) {
                throw new Error('Failed to join room');
            }
        
            setMessage('Joined room successfully!');
            localStorage.setItem("room", JSON.stringify(data.id)); 
        
            setShowPopup(true);
        
            // Show popup for 3 seconds, then redirect to /profile
            setTimeout(() => {
                setShowPopup(false);
                navigate('/userProfile');
            }, 3000);
        } catch (error) {
            setMessage('Invalid invite code');
        }
        
    };

    return (
        <div className="flex flex-col items-center space-y-4 relative">
            <input
                type="text"
                placeholder="Enter invite code"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            
            <button
                onClick={handleJoinRoom}
                className="border p-3 rounded-lg bg-radial-gradient from-[#28206C] to-[#28206C]/0 to-70%"
            >
                Join Room
            </button>

            {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"> 
                    <div className="bg-white border-2 border-green-500 shadow-lg p-4 rounded-xl flex items-center space-x-3 min-w-[300px]">
                        <div className="flex-shrink-0">
                            <CheckCircle className="h-6 w-6 text-green-500" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Success!
                            </h3>
                            <p className="text-gray-600">
                                Room joined successfully!
                            </p>
                        </div>
                    </div>
                </div>
            )}
            
            {!showPopup && message && (
                <p className={`text-sm ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default RoomJoin;

