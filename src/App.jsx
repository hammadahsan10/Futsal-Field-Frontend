import React, { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Routes from "./routes/Routes";
import { useDispatch } from "react-redux";
import {
  setTeamId,
  setAddress,
  setCaptainName,
  setEmail,
  setPhone,
  setTeamName,
} from "./redux/slices/teamSlice";
import { useEffect } from "react";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const dispatch = useDispatch();
  const { sessionStorage } = window;
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  useEffect(() => {
    const teamId = sessionStorage.getItem("teamId");
    if (teamId) {
      dispatch(setTeamId(sessionStorage.getItem("teamId")));
      dispatch(setTeamName(sessionStorage.getItem("teamname")));
      dispatch(setCaptainName(sessionStorage.getItem("captainname")));
      dispatch(setEmail(sessionStorage.getItem("email")));
      dispatch(setPhone(sessionStorage.getItem("phone")));
      dispatch(setAddress(sessionStorage.getItem("address")));
    } else {
      sessionStorage.clear();
      dispatch(setTeamId(""));
      dispatch(setTeamName(""));
      dispatch(setCaptainName(""));
      dispatch(setEmail(""));
      dispatch(setPhone(""));
      dispatch(setAddress(""));
    }
  }, [window.location]);
  
  return (
    <div>
      <Routes />
    </div>
  );
}

export default App;
