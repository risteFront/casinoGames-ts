import React, { useEffect, useState } from "react";
import { useUsersQuery } from "../generated/graphql";
import "../App.css";
interface Props {}

export const Home: React.FC<Props> = () => {
  const { data } = useUsersQuery({ fetchPolicy: "network-only" });

  if (!data) {
    return <div>loading...</div>;
  }

  return (
    <div className="overlay_home">
      <div>users:</div>
      <ul>
        {data.users.map((x) => {
          return (
            <li key={x.id}>
              {x.email}, {x.id}
            </li>
          );
        })}
      </ul>
      <ul>
        {data.users.map((x) => {
          return (
            <li key={x.id}>
              {x.email}, {x.id}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
