import { LockOpen, MailOutline } from "@mui/icons-material";
import { loginUser } from "actions/globalAction";
import Loader from "components/Layout/loader/Loader";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginEmail, loginPassword));
  };

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  if (isAuthenticated) {
    if (user.role !== "user") {
      navigate("/");
    }
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form className="loginForm" onSubmit={loginSubmit}>
          <div className="loginEmail">
            <MailOutline />
            <input
              type="email"
              placeholder="Email"
              required
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div className="loginPassword">
            <LockOpen />
            <input
              type="password"
              placeholder="Password"
              required
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <Link to="/password/forgot">Forget Password ?</Link>
          <input type="submit" value="Login" className="loginBtn" />
        </form>
      )}
    </>
  );
};

export default Login;
