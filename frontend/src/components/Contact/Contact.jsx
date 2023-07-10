import React, { useEffect, useState } from "react";
import "./contact.scss";
import Phone from "../../images/phone.png";
import Email from "../../images/email.png";
import Address from "../../images/address.png";

const Contact = () => {
  const [getUserData, setGetUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  // const [userInput, setUserInput] = useState({});

  const GetUserData = async () => {
    try {
      const resp = await fetch("/getUserData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await resp.json();
      setGetUserData({
        ...getUserData,
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
      });

      if (!resp.status === 200) {
        throw new Error(resp.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ContactInputHandler = (event) => {
    const { name, value } = event.target;
    setGetUserData({ ...getUserData, [name]: value });
  };

  // Sending Data to Backend
  const ContactHandler = async (event) => {
    event.preventDefault();
    const { name, email, phone, message } = getUserData;

    const resp = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });

    const data = await resp.json();

    if (!data) {
      console.log("Data Not Send");
    } else {
      alert("Message Send");
      setGetUserData({ ...getUserData, message: "" });
    }
  };

  useEffect(() => {
    GetUserData();
  }, []);

  return (
    <div className="contact-section">
      <div className="upper-section">
        <div className="contact-box phone">
          <img src={Phone} alt="phone" />
          <div className="phone-text">
            <p>Phone</p>
            <span>+91 9130657655</span>
          </div>
        </div>
        <div className="contact-box email">
          <img src={Email} alt="phone" />
          <div className="phone-text">
            <p>Email</p>
            <span>abcd12@gmail.com</span>
          </div>
        </div>
        <div className="contact-box addres">
          <img src={Address} alt="phone" />
          <div className="phone-text">
            <p>Address</p>
            <span>New Delhi, India</span>
          </div>
        </div>
      </div>
      <div className="contact-container">
        <h2>Get in Touch</h2>

        <form method="POST" className="contact-inp">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={getUserData.name}
            onChange={ContactInputHandler}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={getUserData.email}
            onChange={ContactInputHandler}
          />
          <input
            type="number"
            name="phone"
            placeholder="Your Phone Number"
            value={getUserData.phone}
            onChange={ContactInputHandler}
          />
          <br />
          <textarea
            name="message"
            placeholder="Message"
            value={getUserData.message}
            onChange={ContactInputHandler}
          ></textarea>
          <div className="btn">
            <button onClick={ContactHandler}>Send Message</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
