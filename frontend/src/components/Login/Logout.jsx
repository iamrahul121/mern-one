import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";

const Logout = () => {
  const {state, dispatch} = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        dispatch({type:"USER", payload : false})
        // localStorage.setItem("navToggle", JSON.stringify(state));
        navigate("/login");
        if (res !== 200) {
          throw new Error(res.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <div>Logout</div>;
};

export default Logout;
