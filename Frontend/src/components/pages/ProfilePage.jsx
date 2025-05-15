// import { useEffect, useState } from "react";
// import axios from "axios";

// const ProfilePage = () => {
//   const [userProfile, setUserProfile] = useState(null);
//   const [room, setRoom] = useState(null);
//   const [error, setError] = useState(null);

//   // Fetch userId and roomId from localStorage
//   const userId = localStorage.getItem("user");
//   const roomId = localStorage.getItem("room");

//   useEffect(() => {
//     // Fetch user profile
//     const fetchUserProfile = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/userProfile/${userId}`);

//         console.log(response);

//         setUserProfile(response.data);
//       } catch (err) {
//         setError("Error fetching user profile");
//         console.error(err);
//       }
//     };

//     // Fetch room profile
//     const fetchRoom = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/roomProfile/${userId}`);

//         console.log(response);
//         setRoom(response.data); // Set room data
//       } catch (err) {
//         setError("Error fetching room data");
//         console.error(err);
//       }
//     };

//     // Call both APIs
//     if (userId) fetchUserProfile();
//     if (roomId) fetchRoom();
//   }, [userId, roomId]);

//   if (error) {
//     return <div className="text-red-500 text-center mt-5">{error}</div>;
//   }

//   return (
//     <div className="container mx-auto p-4 mt-28">
//       <div className="flex flex-col md:flex-row gap-6">
//         {/* User Profile Section */}
//         <div className="flex-1 bg-white shadow-lg p-6 rounded-lg">
//           <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
//           {userProfile ? (
//             <div>
//               <p><strong>Username:</strong> {userProfile.username}</p>
//               <p><strong>Role:</strong> {userProfile.role}</p>
//               {/* Additional profile info can be added here */}
//             </div>
//           ) : (
//             <p>Loading user profile...</p>
//           )}
//         </div>

//         {/* Room Profile Section */}
//         <div className="flex-1 bg-white shadow-lg p-6 rounded-lg">
//           <h2 className="text-2xl font-semibold mb-4">Room Information</h2>
//           {room ? (
//             <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow">
//               <p><strong>Room Name:</strong> {room.roomName}</p>
//               <p><strong>Invite Code:</strong> {room.inviteCode}</p>
//               <p><strong>Admin:</strong> {room.admin}</p>
//               {/* Additional room info can be displayed here */}
//             </div>
//           ) : (
//             <p>Loading room data...</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

// import { useEffect, useState } from "react";
// import axios from "axios";

// const ProfilePage = () => {
//   const [profileData, setProfileData] = useState(null);
//   const [error, setError] = useState(null);

//   // Fetch userId and roomId from localStorage
//   const userId = localStorage.getItem("user");
//   const roomId = localStorage.getItem("room");

//   // Trim any potential surrounding quotes
// const sanitizedUserId = userId.replace(/(^"|"$)/g, '');
// const sanitizedRoomId = roomId.replace(/(^"|"$)/g, '');

//   useEffect(() => {
//     // Fetch both user and room profiles
//     const fetchProfileData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/userProfile`, {
//           params: {
//             userId: sanitizedUserId,
//             roomId: sanitizedRoomId,
//           },
//         });

//         console.log(response.data);
//         setProfileData(response.data); // Set the combined profile data
//       } catch (err) {
//         setError("Error fetching profile data");
//         console.error(err);
//       }
//     };

//     // Call the API if both userId and roomId are available
//     if (userId && roomId) fetchProfileData();
//   }, [userId, roomId]);

//   if (error) {
//     return <div className="text-red-500 text-center mt-5">{error}</div>;
//   }

//   if (!profileData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-6 mt-28">
//       {/* User and Room Profiles */}
//       <div className="flex flex-col md:flex-row gap-8">
//         {/* User Profile Section */}
//         <div className="flex-1 bg-white shadow-lg p-6 rounded-lg border border-gray-200">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">User Profile</h2>
//           <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
//             <p className="text-lg font-semibold text-gray-700">
//               <span className="text-gray-900">Email:</span> {profileData.user.username}
//             </p>
//             <p className="text-lg font-semibold text-gray-700 mt-2">
//               <span className="text-gray-900">ID:</span> {profileData.user.id}
//             </p>
//             {/* Add more user details as needed */}
//           </div>
//         </div>

//         {/* Room Profile Section */}
//         <div className="flex-1 bg-white shadow-lg p-6 rounded-lg border border-gray-200">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Room Information</h2>
//           <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
//             <p className="text-lg font-semibold text-gray-700">
//               <span className="text-gray-900">Room Name:</span> {profileData.room.roomName}
//             </p>
//             <p className="text-lg font-semibold text-gray-700 mt-2">
//               <span className="text-gray-900">Invite Code:</span> {profileData.room.inviteCode}
//             </p>
//             <p className="text-lg font-semibold text-gray-700 mt-2">
//               <span className="text-gray-900">Room ID:</span> {profileData.room.id}
//             </p>
//             <p className="text-lg font-semibold text-gray-700 mt-2">
//               <span className="text-gray-900">Users in Room:</span>
//             </p>
//             <ul className="list-disc list-inside ml-4">
//               {profileData.room.userIds.map((userId, index) => (
//                 <li key={index} className="text-gray-700">{userId}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

// };

// export default ProfilePage;

// import { useEffect, useState } from "react";
// import axios from "axios";

// const ProfilePage = () => {
//   const [profileData, setProfileData] = useState();
//   const [error, setError] = useState(null);
//   const [isEditingUser, setIsEditingUser] = useState(false);
//   const [isEditingRoom, setIsEditingRoom] = useState(false);

//   // Fetch userId and roomId from localStorage
//   const userId = localStorage.getItem("user");
//   const roomId = localStorage.getItem("room");

//   // Trim any potential surrounding quotes
//   const sanitizedUserId = userId.replace(/(^"|"$)/g, '');
//   const sanitizedRoomId = roomId.replace(/(^"|"$)/g, '');

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/userProfile`, {
//           params: {
//             userId: sanitizedUserId,
//             roomId: sanitizedRoomId,
//           },
//         });

//         console.log(response.data);
//         setProfileData(response.data); // Set the combined profile data

//       } catch (err) {
//         setError("Error fetching profile data");
//         console.error(err);
//       }
//     };

//     // Call the API if both userId and roomId are available
//     if (userId && roomId) fetchProfileData();
//   }, [userId, roomId]);

//   // console.log(profileData);
//   // console.log(profileData);

//   // Handle saving updated user profile
//   const handleSaveUserProfile = async () => {
//     try {
//       await axios.put(`http://localhost:8080/updateUserProfile`, {
//         userId: sanitizedUserId,
//         username: profileData.user.username,
//         email: profileData.user.email
//       });
//       setIsEditingUser(false);
//       alert("User profile updated successfully!");
//     } catch (err) {
//       alert("Error updating user profile");
//       console.error(err);
//     }
//   };

//   // Handle saving updated room profile (only if admin)
//   const handleSaveRoomProfile = async () => {
//     try {
//       await axios.put(`http://localhost:8080/updateRoomProfile`, {
//         roomId: sanitizedRoomId,
//         roomName: profileData.room.roomName,
//         inviteCode: profileData.room.inviteCode,
//       });
//       setIsEditingRoom(false);
//       alert("Room profile updated successfully!");
//     } catch (err) {
//       alert("Error updating room profile");
//       console.error(err);
//     }
//   };

//   if (error) {
//     return <div className="text-red-500 text-center mt-5">{error}</div>;
//   }

//   if (!profileData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-6 mt-28">
//       {/* User and Room Profiles */}
//       <div className="flex flex-col md:flex-row gap-8">
//         {/* User Profile Section */}
//         <div className="flex-1 bg-white shadow-lg p-6 rounded-lg border border-gray-200">
//           <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">User Profile</h2>
//           <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
//             <label className="text-lg font-semibold text-gray-700">
//               Name:
//               {isEditingUser ? (
//                 <input
//                   type="text"
//                   value={profileData.user.username}
//                   onChange={(e) =>
//                     setProfileData({
//                       ...profileData,
//                       user: { ...profileData.user, username: e.target.value },
//                     })
//                   }
//                   className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
//                 />
//               ) : (
//                 <span className="ml-2">{profileData.user.username}</span>
//               )}
//             </label>
//             <label className="text-lg font-semibold text-gray-700 mt-4">
//               Email:
//               {isEditingUser ? (
//                 <input
//                   type="text"
//                   value={profileData.user.email}
//                   onChange={(e) =>
//                     setProfileData({
//                       ...profileData,
//                       user: { ...profileData.user, email: e.target.value },
//                     })
//                   }
//                   className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
//                 />
//               ) : (
//                 <span className="ml-2">{profileData.user.email}</span>
//               )}
//             </label>

//             {isEditingUser ? (
//               <button
//                 onClick={handleSaveUserProfile}
//                 className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm"
//               >
//                 Save User Profile
//               </button>
//             ) : (
//               <button
//                 onClick={() => setIsEditingUser(true)}
//                 className="mt-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-sm"
//               >
//                 Edit User Profile
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Room Profile Section */}
//         {console.log(profileData.user.id === profileData.room.admin.replace(/[\[\]]/g, ''))}
//         {profileData.user.id === profileData.room.admin.replace(/[\[\]]/g, '') && (
//           <div className="flex-1 bg-white shadow-lg p-6 rounded-lg border border-gray-200">
//             <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Room Information (Admin)</h2>
//             <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
//               <label className="text-lg font-semibold text-gray-700">
//                 Room Name:
//                 {isEditingRoom ? (
//                   <input
//                     type="text"
//                     value={profileData.room.roomName}
//                     onChange={(e) =>
//                       setProfileData({
//                         ...profileData,
//                         room: { ...profileData.room, roomName: e.target.value },
//                       })
//                     }
//                     className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
//                   />
//                 ) : (
//                   <span className="ml-2">{profileData.room.roomName}</span>
//                 )}
//               </label>
//               <label className="text-lg font-semibold text-gray-700 mt-4">
//                 Invite Code:
//                 {isEditingRoom ? (
//                   <input
//                     type="text"
//                     value={profileData.room.inviteCode}
//                     onChange={(e) =>
//                       setProfileData({
//                         ...profileData,
//                         room: { ...profileData.room, inviteCode: e.target.value },
//                       })
//                     }
//                     className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
//                   />
//                 ) : (
//                   <span className="ml-2">{profileData.room.inviteCode}</span>
//                 )}
//               </label>

//               {isEditingRoom ? (
//                 <button
//                   onClick={handleSaveRoomProfile}
//                   className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm"
//                 >
//                   Save Room Profile
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => setIsEditingRoom(true)}
//                   className="mt-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-sm"
//                 >
//                   Edit Room Profile
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

import { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState();
  const [error, setError] = useState(null);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [isEditingRoom, setIsEditingRoom] = useState(false);

  // Fetch userId and roomId from localStorage
  const userId = localStorage.getItem("user");
  const roomId = localStorage.getItem("room");

  // Trim any potential surrounding quotes
  const sanitizedUserId = userId.replace(/(^"|"$)/g, "");
  const sanitizedRoomId = roomId.replace(/(^"|"$)/g, "");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/userProfile`, {
          params: {
            userId: sanitizedUserId,
            roomId: sanitizedRoomId,
          },
        });

        console.log(response.data);
        setProfileData(response.data); // Set the combined profile data
      } catch (err) {
        setError("Error fetching profile data");
        console.error(err);
      }
    };

    // Call the API if both userId and roomId are available
    if (userId && roomId) fetchProfileData();
  }, [userId, roomId]);

  // Handle saving updated user profile
  const handleSaveUserProfile = async () => {
    try {
      await axios.put(`http://localhost:8080/updateUserProfile`, {
        id: profileData.user.id, // Make sure the 'id' field matches the backend requirement
        username: profileData.user.username,
        // email: profileData.user.email
      });
      setIsEditingUser(false);
      alert("User profile updated successfully!");
    } catch (err) {
      alert("Error updating user profile!!");
      console.error(err);
    }
  };

  // Handle saving updated room profile (only if admin)
  const handleSaveRoomProfile = async () => {
    try {
      await axios.put(
        `http://localhost:8080/updateRoomProfile?roomId=${sanitizedRoomId}`, // Pass roomId as a query param
        {
          roomName: profileData.room.roomName, // Room name
          inviteCode: profileData.room.inviteCode, // Invite code
          userIds: profileData.room.userIds, // Array of user IDs (updated)
        }
      );

      setIsEditingRoom(false);
      alert("Room profile updated successfully!");
    } catch (err) {
      alert("Error updating room profile");
      console.error(err);
    }
  };

  if (error) {
    return <div className="text-red-500 text-center mt-5">{error}</div>;
  }

  if (!profileData) {
    return <div>Loading...</div>;
  }

  const isAdmin =
    profileData.user.id === profileData.room.admin.replace(/[\[\]]/g, "");

  return (
    <div className="container mx-auto p-6 mt-28 h-[75vh]">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 bg-white shadow-lg p-6 rounded-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            User Profile
          </h2>
          <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
            <label className="text-lg font-semibold text-gray-700">
              Email:
              {isEditingUser ? (
                <input
                  type="text"
                  value={profileData.user.username}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      user: { ...profileData.user, username: e.target.value },
                    })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
                />
              ) : (
                <span className="ml-2">{profileData.user.username}</span>
              )}
            </label>
            <label className="text-lg font-semibold text-gray-700 mt-4">
              Id:
              {isEditingUser ? (
                <input
                  type="text"
                  value={profileData.user.id}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      user: { ...profileData.user, id: e.target.value },
                    })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
                />
              ) : (
                <span className="ml-2">{profileData.user.id}</span>
              )}
            </label>

            {isEditingUser ? (
              <button
                onClick={handleSaveUserProfile}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm"
              >
                Save User Profile
              </button>
            ) : (
              <button
                onClick={() => setIsEditingUser(true)}
                className="mt-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-sm"
              >
                Edit User Profile
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 bg-white shadow-lg p-6 rounded-lg border border-gray-200">
          <h2 className={`text-3xl font-bold text-gray-800 mb-6 text-center`}>
            Room Information {isAdmin ? "(Admin)" : ""}
          </h2>
          <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
            <label className="text-lg font-semibold text-gray-700">
              Room Name:
              {isAdmin && isEditingRoom ? (
                <input
                  type="text"
                  value={profileData.room.roomName}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      room: { ...profileData.room, roomName: e.target.value },
                    })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
                />
              ) : (
                <span className="ml-2">{profileData.room.roomName}</span>
              )}
            </label>

            <label className="text-lg font-semibold text-gray-700 mt-4">
              Invite Code:
              {isAdmin && isEditingRoom ? (
                <input
                  type="text"
                  value={profileData.room.inviteCode}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      room: { ...profileData.room, inviteCode: e.target.value },
                    })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
                />
              ) : (
                <span className="ml-2">{profileData.room.inviteCode}</span>
              )}
            </label>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700">
                Room Users:
              </h3>
              <ul className="list-disc list-inside ml-4 mt-2">
                {isAdmin && isEditingRoom
                  ? profileData.room.userIds
                      .filter((user) => user.trim() !== "") // Filter out empty userIds
                      .map((user, index) => (
                        <li key={index} className="text-gray-700">
                          <input
                            type="text"
                            value={user}
                            onChange={(e) => {
                              const updatedUserIds = [
                                ...profileData.room.userIds,
                              ];
                              updatedUserIds[index] = e.target.value;
                              setProfileData({
                                ...profileData,
                                room: {
                                  ...profileData.room,
                                  userIds: updatedUserIds,
                                },
                              });
                            }}
                            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3"
                          />
                        </li>
                      ))
                  : profileData.room.userIds
                      .filter((user) => user.trim() !== "") // Filter out empty userIds
                      .map((user, index) => (
                        <li key={index} className="text-gray-700">
                          {user}
                        </li>
                      ))}
              </ul>
            </div>

            {/* Admin actions */}
            {isAdmin && (
              <>
                {isEditingRoom ? (
                  <button
                    onClick={handleSaveRoomProfile}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm"
                  >
                    Save Room Profile
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditingRoom(true)}
                    className="mt-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow-sm"
                  >
                    Edit Room Profile
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
