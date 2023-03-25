import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { loadUser } from "actions/globalAction";
import Layout from "components/Layout/Layout";
import Dashboard from "components/Pages/Dashboard";
import Login from "components/Pages/Login";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { store } from "store";
import { themeSettings } from "./theme";

function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const {mode} = useSelector(state=>state.mode)
  const theme = useMemo(()=>createTheme(themeSettings(mode)), [mode])

  return <div className="app">
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to='/dashboard' replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </ThemeProvider>
  </div>;
}

export default App;
