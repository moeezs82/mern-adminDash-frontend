import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { loadUser } from "actions/globalAction";
import Layout from "components/Layout/Layout";
import Customers from "components/Pages/customers";
import Dashboard from "components/Pages/Dashboard";
import Login from "components/Pages/Login";
import Products from "components/Pages/products";
import Transactions from "components/Pages/transactions";
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
          <Route path="/products" element={<Products />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/transactions" element={<Transactions />} />
        </Route>
      </Routes>
    </ThemeProvider>
  </div>;
}

export default App;
