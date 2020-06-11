import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  NavLink,
} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

import {
  useMeQuery,
  useLogoutMutation,
  useAdminQuery,
} from "./generated/graphql";
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

  // useEffect(() => {
  //   // if (data && data.me && getAccessToken() == "") {
  //   //   console.log("here");
  //   socket = io(ENDPOINT);
  //   if (data && data.me) {
  //     setRoom({ email: data.me.email });
  //     setName("room");
  //     socket.emit("join", { name, room }, (error: any) => {
  //       if (error) {
  //         alert(error);
  //       }
  //     });
  //   }
  //   console.log(socket);
  //   console.log(getAccessToken().length);
  //   return () => {
  //     socket.emit("disconnect");
  //     socket.off();
  //   };
  // }, [getAccessToken().length > 1]);
  const [logout, { client }] = useLogoutMutation();
  // useEffect(() => {
  //   socket.on("message", (name) => {
  //     console.log(name);
  //   });

  //   // socket.on("roomData", ({ users }) => {
  //   //   setUsers(users);
  //   // });
  // }, []);

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
          <Link to="/home">
            <li>Home</li>
          </Link>
          <li>Posts</li>
          {data && data.me && data.me.role == "Admins" ? (
            <li className="admin-panel">Admin Panel</li>
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
      </div>
    </div>
    // <Navbar bg="dark" variant="dark">
    //   <img src={Logo}></img>
    //   <Navbar.Brand href="#home">CasinoGames</Navbar.Brand>
    //   <Nav className="mr-auto">
    //     <NavLink to="/" className="home" href="#home">
    //       Home
    //     </NavLink>
    //     <NavLink to="/posts" className="home" href="#post">
    //       Posts
    //     </NavLink>
    //   </Nav>
    //   <Form inline>
    //     {data && data.me ? (
    //       <Badge variant="light">User: {data.me.email}</Badge>
    //     ) : null}

    //     <Button variant="outline-info">
    //       <Link className="inheritStyle" to="/login">
    //         Login
    //       </Link>
    //     </Button>
    //     <Button variant="outline-success">
    //       <Link className="inheritStyle" to="/register">
    //         Register
    //       </Link>
    //     </Button>
    //     {!loading && data && data.me ? (
    //       <Button
    //         variant="outline-danger"
    //         onClick={async () => {
    //           await logout();
    //           setAccessToken("");
    //           await client!.resetStore();
    //         }}
    //       >
    //         logout
    //       </Button>
    //     ) : null}
    //   </Form>
    // </Navbar>
    // <header>
    //   <div>
    //     <Link to="/">home</Link>
    //   </div>
    //   <div>
    //     <Link to="/register">register</Link>
    //   </div>
    //   <div>
    //     <Link to="/login">login</Link>
    //   </div>
    //   <div>
    //     <Link to="/bye">bye</Link>
    //   </div>
    //   <div>
    //     {!loading && data && data.me ? (
    //       <button
    //         onClick={async () => {
    //           await logout();
    //           setAccessToken("");
    //           await client!.resetStore();
    //         }}
    //       >
    //         logout
    //       </button>
    //     ) : null}
    //   </div>
    //   {body}
    // </header>
  );
};
