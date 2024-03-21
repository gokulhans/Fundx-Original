import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import StartUpHome from "./pages/StartUpHome/StartUpHome";
import InvestorHome from "./pages/InvestorHome/InvestorHome";
import InvestorProfileForm from "./pages/InvestorProfileForm/InvestorProfileForm";
import StartupProfileForm from "./pages/StartupProfileForm/StartupProfileForm";

function App() {
  const [isUser, setIsUser] = useState(localStorage.getItem("isUser"));
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") || false
  );
  const [isStartup, setisStartup] = useState(
    localStorage.getItem("type") == "startup" || false
  );
  const [isInvestor, setisInvestor] = useState(
    localStorage.getItem("type") == "investor" || false
  );

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-blue-100 dark:bg-gray-900 dark:text-gray-50">
        <Navbar isUser={isUser} setIsUser={setIsUser} />
        <div className="pt-16 min-h-screen flex flex-col items-center justify-center">
          <Routes>
            {!isUser ? (
              <>
                <Route path="/" element={<Navigate to={"/signin"} />} />
                <Route path="*" element={<Navigate to={"/"} />} />
                <Route
                  path="/signup"
                  element={<SignUp setIsUser={setIsUser} />}
                />
                <Route
                  path="/signin"
                  element={
                    <SignIn
                      setIsUser={setIsUser}
                      setisStartup={setisStartup}
                      setisInvestor={setisInvestor}
                    />
                  }
                />
              </>
            ) : (
              <>
                <Route
                  exact
                  path="/"
                  element={
                    isStartup ? (
                      <StartUpHome />
                    ) : isInvestor ? (
                      <InvestorHome />
                    ) : (
                      <Home isUser={isUser} />
                    )
                  }
                />
                <Route
                  path="/investor-profile"
                  element={
                    isInvestor ? (
                      <Navigate to={"/"} />
                    ) : (
                      <InvestorProfileForm setisInvestor={setisInvestor} />
                    )
                  }
                />
                <Route
                  path="/startup-profile"
                  element={
                    isStartup ? (
                      <Navigate to={"/"} />
                    ) : (
                      <StartupProfileForm setisStartup={setisStartup} />
                    )
                  }
                />
                <Route path="*" element={<Navigate to={"/"} />} />
              </>
            )}
          </Routes>
        </div>
        <Footer isUser={isUser} />
      </div>
    </>
  );
}

export default App;
