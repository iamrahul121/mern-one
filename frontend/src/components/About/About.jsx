import React, { useEffect, useState } from "react";
import "./about.scss";
import AboutLogo from "../../images/12065244_4882404.jpg";
import { Link, useNavigate } from "react-router-dom";
import AboutData from "./AboutData";
import Timeline from "./Timeline";

const About = () => {
  const navigate = useNavigate();
  const [showHide, setShowHide] = useState(true);
  const [getUserData, setGetUserData] = useState({});

  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      setGetUserData(data);

      if (!res.status === 200) {
        throw new Error(res.error);
      }
    } catch (error) {
      navigate("/login");
      // throw new Error("User Not Found");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <div className="about-section">
      <form method="GET" className="about-box">
        <div className="about-left">
          <figure>
            <img src={AboutLogo} alt="about" width={180} />
          </figure>
          <div className="about-links">
            <Link>
              <i className="fa-brands fa-youtube"></i> <span>YouTube</span>
            </Link>
            <Link>
              <i className="fa-brands fa-instagram"></i> <span>Instagram</span>
            </Link>
            <Link>
              <i className="fa-brands fa-facebook"></i> <span>Facebook</span>
            </Link>
            <Link>
              <i className="fa-brands fa-linkedin"></i>
              <span>LinkedIn</span>
            </Link>
            <Link>
              <i className="fa-brands fa-twitter"></i> <span>Twitter</span>
            </Link>
          </div>
        </div>
        <div className="about-right">
          <div className="about-info">
            <div className="general-info">
              <h2>{getUserData.name}</h2>
              <p>{getUserData.role}</p>
            </div>
            <div className="btn">
              <button>Edit Profile</button>
            </div>
          </div>
          <div className="more-info">
            <div className="about-tab">
              <p
                onClick={() => setShowHide(true)}
                className={showHide ? "active" : ""}
              >
                About
              </p>
              <p
                onClick={() => setShowHide(false)}
                className={showHide ? "" : "active"}
              >
                Timeline
              </p>
            </div>
            <hr />
            {showHide ? (
              <AboutData data={getUserData} />
            ) : (
              <Timeline data={getUserData} />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default About;
