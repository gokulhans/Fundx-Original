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
import SingleStartup from "./pages/SingleStartup/SingleStartup";
import SingleInvestor from "./pages/SingleInvestor/SingleInvestor";
import Sidebar from "./components/Sidebar/Sidebar";
import FeedBack from "./pages/FeedBack/FeedBack";
import Complaint from "./pages/Complaint/Complaint";
import SignInScreen from "./pages/SubAdmin/SignInScreen";
import Users from "./components/SubAdmin/Users/Users";
import Investors from "./components/SubAdmin/Investors/Investors";
import Startup from "./components/SubAdmin/Startups/Startup";
import Homescreen from "./pages/SubAdmin/Homescreen";
import AdminSignin from "./pages/Admin/AdminSignin";
import AdminHome from "./pages/Admin/AdminHome";
import Subadmins from "./components/Admin/Subadmins/Subadmins";
import AddSubAdmin from "./components/Admin/AddSubAdmin/AddSubAdmin";
import AdminStartup from "./components/Admin/Startups/Startup";
import AdminInvestors from "./components/Admin/Investors/Investors";
import WebsiteHome from "./pages/WebsiteHome/WebsiteHome";
import AdminComplaint from "./pages/Admin/AdminComplaint";
import AdminFeedback from "./pages/Admin/AdminFeedback";
import Requests from "./pages/Requests/Requests";

function App() {
  const [isUser, setIsUser] = useState(localStorage.getItem("isUser"));
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") || false
  );
  const [isSubAdmin, setIsSubAdmin] = useState(
    localStorage.getItem("isSubAdmin") || false
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
      <div
        className={
          localStorage.getItem("type") != null
            ? `bg-blue-100 dark:bg-gray-900 dark:text-gray-50 pl-36`
            : `bg-blue-100 dark:bg-gray-900 dark:text-gray-50 `
        }
      >
        <Navbar
          isUser={isUser}
          setIsUser={setIsUser}
          isSubAdmin={isSubAdmin}
          setIsSubAdmin={setIsSubAdmin}
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
          isStartup={isStartup}
          setisStartup={setisStartup}
          isInvestor={isInvestor}
          setisInvestor={setisInvestor}
        />
        {localStorage.getItem("type") != null ? <Sidebar /> : null}
        <div className="pt-16 min-h-screen flex flex-col items-center justify-center">
          <Routes>
            {!isUser ? (
              <>
                <Route path="/" element={<WebsiteHome />} />
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
                <Route path="/startup/:id" element={<SingleStartup />} />
                <Route path="/investor/:id" element={<SingleInvestor />} />
                <Route path="/startups" element={<InvestorHome />} />
                <Route path="/investors" element={<StartUpHome />} />
                <Route path="/complaint" element={<Complaint />} />
                <Route path="/feedback" element={<FeedBack />} />

                <Route path="*" element={<Navigate to={"/"} />} />
              </>
            )}
            <Route
              path="/subadmin"
              element={
                isSubAdmin ? (
                  <Navigate to={"/subadmin/investors"} />
                ) : (
                  <SignInScreen />
                )
              }
            />
            <Route path="/subadmin/users" element={<Users />} />
            <Route path="/subadmin/investors" element={<Investors />} />
            <Route path="/subadmin/startups" element={<Startup />} />
            <Route
              path="/admin"
              element={
                isAdmin ? <Navigate to={"/admin/investors"} /> : <AdminSignin />
              }
            />
            <Route path="/admin/investors" element={<AdminInvestors />} />
            <Route path="/admin/startups" element={<AdminStartup />} />
            <Route path="/admin/subadmins" element={<Subadmins />} />
            <Route path="/admin/feedbacks" element={<AdminFeedback />} />
            <Route path="/admin/complaints" element={<AdminComplaint />} />
            \
            <Route path="/requests" element={<Requests />} />
            <Route path="/add-subadmin" element={<AddSubAdmin />} />
          </Routes>
        </div>
      </div>
      <Footer isUser={isUser} />
    </>
  );
}

export default App;
