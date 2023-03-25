import { Box, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./include/Navbar";
import Sidebar from "./include/Sidebar";
import Loader from "./loader/Loader";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)"); //on desktop returns true
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading === false) {
    if (isAuthenticated === false) {
      return <Navigate to="/login" />;
    }
    if (user.role === "user") {
      return <Navigate to="/login" />;
    }

    return (
      <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
        <Sidebar
          user={user}
          isNonMobile={isNonMobile}
          drawerWidth="250px"
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Box flexGrow={1}>
          <Navbar
            user={user}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <Outlet />
        </Box>
      </Box>
    );
  }

  // will display loader until loading is true
  return <Loader />;
};

export default Layout;
