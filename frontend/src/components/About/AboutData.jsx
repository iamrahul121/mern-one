import React from "react";

const AboutData = (props) => {
  return (
    <ul className="info-list">
      <div className="lists">
        <li>User Id</li>
        <li>{props.data._id}</li>
      </div>
      <div className="lists">
        <li>Name</li>
        <li>{props.data.name}</li>
      </div>
      <div className="lists">
        <li>Email</li>
        <li>{props.data.email}</li>
      </div>
      <div className="lists">
        <li>Phone</li>
        <li>{props.data.phone}</li>
      </div>
      <div className="lists">
        <li>Profession</li>
        <li>{props.data.role}</li>
      </div>
    </ul>
  );
};

export default AboutData;
