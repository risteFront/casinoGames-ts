import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  NavLink,
} from "react-router-dom";

import { useMeQuery, useLogoutMutation } from "./generated/graphql";
import { setAccessToken, getAccessToken } from "./accessToken";
import io from "socket.io-client";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import "./App.css";
import Logo from "./assets/logo.png";
// import Emmiter from "./emiter";
interface Props {}
const ENDPOINT = "localhost:4000";

export const Header: React.FC<Props> = () => {
  const { data, loading } = useMeQuery();
  // const {data, loading} = useAdminQuery();

  let location = useLocation();
  const [room, setRoom] = useState({ email: "" });
  const [name, setName] = useState("");

  var socket: any;
  const [logout, { client }] = useLogoutMutation();

  let body: any = null;

  //const connectoin = new Emmiter();
  // let socket: any = null;

  if (loading) {
    body = null;
  } else if (data && data.me && data.me.role) {
    console.log(data.me.role);
    // socket = io(ENDPOINT);
    // console.log(getAccessToken());

    // setRoom("notify");
    // setName(data.me.email);
    // console.log(data.me.email);
    // socket.emit("join", { name, room }, (error: any) => {
    //   if (error) {
    //     alert(error);
    //   }
    // });
    //connectoin.getConnection();
    body = <div>you are logged in as: {data.me.email}</div>;
  } else {
    if (getAccessToken() == "") {
      console.log("ajdewjd");
    }
    //socket.disconnect();
    //connectoin.closeConnection();
    // socket.off();
    body = <div>not logged in</div>;
  }

  return (
    <div className="header_container">
      <img className="logo" src={Logo}></img>
      <div className="navs-header">
        <ul>
          {data && data.me ? (
            <div style={{ display: "flex" }}>
              <Link to="/home">
                <li>Games</li>
              </Link>
              <Link to="/post">
                <li>Posts</li>
              </Link>
            </div>
          ) : null}

          {data && data.me && data.me.role == "Admins" ? (
            <div className="admin-header">
              <Link to="/admin">
                <li className="admin-panel">Admin Panel</li>
              </Link>
              <Link to="/game">
                <li className="game-panel">Add Game</li>
              </Link>
            </div>
          ) : null}
        </ul>
      </div>
      <div className="box-1" onClick={() => console.log("herewe")}>
        <Link to="/login">
          <div className="btn btn-one">
            <span>LOGIN</span>
          </div>
        </Link>
        <Link to="/register">
          <div className="btn btn-one">
            <span>REGISTER</span>
          </div>
        </Link>
        {data && data.me ? (
          <div
            onClick={async () => {
              await logout();
              setAccessToken("");
              await client!.resetStore();
            }}
            className="btn btn-two"
          >
            <span>LOGOUT</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};
