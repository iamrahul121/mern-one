import React, { useState } from "react";
import "./signUp.scss";
import RegisterImg from "../../images/regis.jpg";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    cpassword: "",
  });

  const navigate = useNavigate();

  const SignUpHandler = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    const { name, email, phone, role, password, cpassword } = userData;

    if (!name || !email || !phone || !role || !password || !cpassword) {
      return alert("Invalid Details");
    } else {
      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          role,
          password,
          cpassword,
        }),
      });
      const data = await res.json();
      switch (data.type) {
        case "success":
          alert("Registration Sucessfull");
          navigate("/login");
          break;
        case "userExits":
          alert("User Already Exits");
          break;
        default:
          alert("Registration Failed");
          break;
      }
    }
  };

  return (
    <div className="register-section">
      <div className="register-container">
        <div className="register-left">
          <h2>Sign Up</h2>
          <form method="POST" className="inp">
            <div className="box name-box">
              <i className="fa-solid fa-user"></i>
              <input
                type="text"
                placeholder="Your Name"
                autoComplete="off"
                name="name"
                value={userData.name}
                onChange={SignUpHandler}
              />
            </div>

            <div className="box email-box">
              <i className="fa-solid fa-envelope"></i>
              <input
                type="email"
                placeholder="Your Email"
                autoComplete="off"
                name="email"
                value={userData.email}
                onChange={SignUpHandler}
              />
            </div>

            <div className="box number-box">
              <i className="fa-solid fa-phone"></i>
              <input
                type="number"
                placeholder="Mobile Number"
                autoComplete="off"
                name="phone"
                value={userData.phone}
                onChange={SignUpHandler}
              />
            </div>

            <div className="box role-box">
              <i className="fa-solid fa-briefcase"></i>
              <input
                type="text"
                placeholder="Your Profession"
                autoComplete="off"
                name="role"
                value={userData.role}
                onChange={SignUpHandler}
              />
            </div>

            {/* <div className="box city-box">
              <i class="fa-solid fa-house"></i>
              <input type="text" placeholder="Your City" />
            </div> */}

            <div className="box password-box">
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                autoComplete="off"
                name="password"
                value={userData.password}
                onChange={SignUpHandler}
              />
            </div>

            <div className="box cpassword-box">
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                placeholder="Confirm Password"
                autoComplete="off"
                name="cpassword"
                value={userData.cpassword}
                onChange={SignUpHandler}
              />
            </div>
            <div className="btn">
              <button onClick={SubmitHandler}>Register</button>
            </div>
          </form>
        </div>
        <div className="register-right">
          <img src={RegisterImg} alt="Register Image" />
          <div className="text">
            <p onClick={() => navigate("/login")}>I am already register</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
