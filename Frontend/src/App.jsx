import { Route, Routes } from "react-router-dom";
import ButtonGradient from "./assets/svg/ButtonGradient";
import Benefits from "./components/Benefits";
import Collaboration from "./components/Collaboration";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import RegisterPage from "./components/pages/RegisterPage";
import LoginPage from "./components/pages/LoginPage";
import Services from "./components/pages/Services";

// Import the new room-related components
import RoomCreation from "./components/pages/RoomCreation";
import RoomJoin from "./components/pages/RoomJoin";
import Dashboard from "./components/pages/Dashboard";
import Calender from "./components/pages/Calender";
import ProfilePage from "./components/pages/ProfilePage";
import Expense from "./components/pages/Expenses";

const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Hero />
              <Benefits />
              <Collaboration />
              <Footer />
            </>
          }
        />

        <Route
          path="/api/auth/register"
          element={
            <>
              <Header />
              <RegisterPage />
            </>
          }
        />

        <Route
          path="/api/auth/login"
          element={
            <>
              <Header />
              <LoginPage />
            </>
          }
        />

        <Route
          path="/services"
          element={
            <>
              <Header />
              <Services />
            </>
          }
        />

        {/* New routes for Room Creation and Room Joining */}
        <Route
          path="/dashboard/:userId"
          element={
            <>
              <Header />
              <Dashboard />
              <Footer />
            </>
          }
        />
        <Route
          path="/room/create"
          element={
            <>
              <Header />
              <RoomCreation />
              <Footer />
            </>
          }
        />

        <Route
          path="/room/join"
          element={
            <>
              <Header />
              <RoomJoin />
              <Footer />
            </>
          }
        />

        <Route
          path="/calender"
          element={
            <>
              <Header />
              <Calender />
              <Footer />
            </>
          }
        />

        <Route
          path="/userProfile"
          element={
            <>
              <Header />
              <ProfilePage />
              <Footer/>
            </>
          }
        />

        <Route
          path="/expenses"
          element={
            <>
              <Header />
              <Expense />
              <Footer />
            </>
          }
        />

      </Routes>

      <ButtonGradient />
    </div>
  );
};

export default App;
