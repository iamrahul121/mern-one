import React, { useEffect, useState } from "react";
import "./home.scss";

const Home = () => {
  const [userName, setUserName] = useState();
  const [show, setShow] = useState(false);

  const GetUserData = async () => {
    try {
      const resp = await fetch("/getUserData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await resp.json();
      setUserName(data.name);
      setShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetUserData();
  }, []);

  return (
    <div className="home-section">
      <div className="home-text">
        <h4>Welcome</h4>
        <h2>{userName}</h2>
        <h3>{show ? "Happy to see you again" : "We are Mern Developer"}</h3>
      </div>
      <div className="left-home"></div>
      <div className="right-home"></div>
    </div>
  );
};

export default Home;
