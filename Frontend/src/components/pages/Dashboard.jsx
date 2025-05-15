import { useParams } from "react-router-dom";
import ClipPath from "../../assets/svg/ClipPath";
import Section from "../Section";
import RoomCreation from "./RoomCreation.jsx";
import RoomJoin from "./RoomJoin.jsx";

const Dashboard = () => {

  const { userId } = useParams();
  localStorage.setItem("user", JSON.stringify(userId));


  return (
    <Section id="services">
      <div className="container relative z-2 min-h-screen flex flex-col justify-center items-center">
        <div className="flex flex-wrap gap-14 justify-center items-center w-full max-w-6xl px-10 py-12">

          <div className="block relative p-0.5  shadow-lg rounded-lg overflow-hidden w-full sm:w-[24rem] border">
            <div className="relative z-2 flex flex-col min-h-[22rem] p-6 items-center">
              <h5 className="h5 mb-5 text-blue-600">Create a Room</h5>
              <p className="body-2 mb-6 text-gray-600 text-center">
                Create a new room to collaborate with roommates.
              </p>
              <RoomCreation userId={userId} />
            </div>
            <div className="absolute top-1/4 w-full aspect-square bg-radial-gradient from-[#28206C] to-[#28206C]/0 to-70% pointer-events-none" />

            <ClipPath />
          </div>

          <div className="block relative p-0.5 shadow-lg rounded-lg overflow-hidden w-full sm:w-[24rem] border">
            <div className="relative flex flex-col min-h-[22rem] p-6 items-center">
              <h5 className="h5 mb-5 text-green-600">Join a Room</h5>
              <p className="body-2 mb-6 text-gray-600 text-center">
                Join an existing room using an invite code.
              </p>
              <RoomJoin userId={userId} />
            </div>
            <div className="absolute top-1/4 w-full aspect-square bg-radial-gradient from-[#28206C] to-[#28206C]/0 to-70% pointer-events-none " />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Dashboard;
