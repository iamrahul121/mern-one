import React, { useContext, useState } from "react";
import "./login.scss";
import LoginImg from "../../images/12065244_4882404.jpg";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";

const Login = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const LoginHandler = async (e) => {
    e.preventDefault();

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
    });

    const data = await res.json();

    if (data.type === "success") {
      alert("Login Sucessfull");
      dispatch({ type: "USER", payload: true });
      // localStorage.setItem("navToggle", JSON.stringify(state));
      navigate("/");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="login-section">
      <div className="login-container">
        <div className="login-left">
          <h2>Welcome Back!</h2>
          <form method="POST" className="inp">
            <div className="box email-box">
              <i className="fa-solid fa-envelope"></i>
              <input
                type="email"
                placeholder="Your Email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>

            <div className="box password-box">
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </div>
            <div className="btn">
              <button onClick={LoginHandler}>Login</button>
            </div>
          </form>
        </div>
        <div className="login-right">
          <img src={LoginImg} alt="login Image" />
          <div className="text">
            <p onClick={() => navigate("/register")}>Create an account</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
