import React, { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Footer from "./components/footer/footer";
import AdminDashboardPage from "./admin/pages/AdminDashboardPage";
import theme from "./styles/theme";
import SignIn from "./components/SignIn/SignIn";
import NotFoundPage from "./admin/pages/NotFoundPage";
import SideBar from "./components/common/sidebarHeader";
import Attendance from "./admin/pages/attendance/Attendance";
import Chat from "./admin/pages/Chat";
import Overview from "./admin/pages/profile";
import Payroll from "./admin/pages/Payroll";
import AttendanceList from "./admin/pages/AttendanceList";
import Resume from "./admin/pages/Resume";
import Form from "./admin/pages/Form";
import { ResumeUpload } from "./admin/pages/ResumeUpload";
import Employees from "./admin/pages/employee/Employee";
import Task from "./admin/pages/task/Task";
import Chatbot from "./admin/pages/Chatbot";


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "isUserLoggedIn") {
        setIsLoggedIn(event.newValue === "true");
      }
    };
    window.addEventListener("storage", handleStorageChange);
    const userIsLoggedIn = localStorage.getItem("isUserLoggedIn");
    setIsLoggedIn(userIsLoggedIn === "true");
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);


  const [sideBarWidth, setSideBarWidth] = useState("large");

  const handleSidebarWidth = () => {
    setSideBarWidth(prevWidth => (prevWidth === "small" ? "large" : "small"));
  }

  return (
    <ChakraProvider theme={theme}>
      {isLoggedIn ? (
        <>
          {<SideBar sideBarWidth={sideBarWidth} handleSidebarWidth={handleSidebarWidth} />}
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<AdminDashboardPage sideBarWidth={sideBarWidth} />} />
            <Route path="/employees" element={<Employees sideBarWidth={sideBarWidth} />} />
            <Route path="/attendance/user/:userId" element={<Attendance sideBarWidth={sideBarWidth} />} />
            <Route path="/attendance" element={<AttendanceList sideBarWidth={sideBarWidth} />} />
            <Route path="/chat" element={<Chat sideBarWidth={sideBarWidth} handleSidebarWidth={handleSidebarWidth} />} />
            <Route path="/profile" element={<Overview sideBarWidth={sideBarWidth} />} />
            <Route path="/resumeupload" element={<ResumeUpload sideBarWidth={sideBarWidth} />} />
            <Route path="/resumechat" element={<Chatbot sideBarWidth={sideBarWidth} />} />
            <Route path="/form" element={<Form sideBarWidth={sideBarWidth} />} />
            <Route path="/resume" element={<Resume sideBarWidth={sideBarWidth} />} />
            <Route path="/payroll" element={<Payroll sideBarWidth={sideBarWidth} />} />
            <Route path="/task" element={<Task sideBarWidth={sideBarWidth} />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <Routes>
          <Route path="/*" element={<NotFoundPage />} />
          <Route path="/" element={<SignIn />} />
        </Routes>
      )}
    </ChakraProvider>
  );
}
