import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { useLoginMutation, MeDocument, MeQuery } from "../generated/graphql";
import { setAccessToken } from "../accessToken";
//import io from "socket.io-client";
import { Form, Button } from "react-bootstrap";
import "../App.css";
interface Props {}
export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form submitted");
    const response = await login({
      variables: {
        email,
        password,
      },
      update: (store, { data }) => {
        if (!data) {
          return null;
        }

        store.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            me: data.login.user,
          },
        });
      },
    });

    console.log(response);
    if (response && response.data) {
      setAccessToken(response.data.login.accessToken);
    }
    history.push("/");
  };
  return (
    // <form
    //   onSubmit={async (e) => {
    //     e.preventDefault();
    //     console.log("form submitted");
    //     const response = await login({
    //       variables: {
    //         email,
    //         password,
    //       },
    //       update: (store, { data }) => {
    //         if (!data) {
    //           return null;
    //         }

    //         store.writeQuery<MeQuery>({
    //           query: MeDocument,
    //           data: {
    //             me: data.login.user,
    //           },
    //         });
    //       },
    //     });

    //     console.log(response);

    //     console.log("here we go");

    //     if (response && response.data) {
    //       setAccessToken(response.data.login.accessToken);
    //       //const ENDPOINT = "localhost:4000";

    //       // const socket = io(ENDPOINT);
    //       // const socket = getSocket();
    //       // socket.emit('join',()=>{

    //       // })
    //       // setTimeout(() => {
    //       //   socket.emit("disconnect");
    //       //   socket.off();
    //       // }, 1000);
    //     }

    //     history.push("/");
    //   }}
    // >
    <Form className="loginForm">
      <Form.Group controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Form.Group>
      <Button
        on
        as="input"
        type="submit"
        onClick={(e) => handleSubmit(e)}
        value="Submit"
      />
    </Form>
  );
};
