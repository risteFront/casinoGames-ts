import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";

import {
  useLoadGamesQuery,
  useRemoveGameMutation,
  LoadGamesQuery,
  LoadGamesDocument,
} from "../generated/graphql";
import "./Games.css";
interface Props {}

export const Home: React.FC<Props> = () => {
  const { data } = useLoadGamesQuery({
    fetchPolicy: "cache-and-network",
    errorPolicy: "ignore",
  });
  const [removeGame, loading] = useRemoveGameMutation();
  const [names, setName] = useState("");

  useEffect(() => {
    // Update the document title using the browser API
    console.log(data);
  }, [data]);

  if (!data) {
    return <div>loading...</div>;
  }
  const removeGames = async () => {
    let fullName = names;
    console.log(names);

    await removeGame({
      variables: {
        name: names,
      },
      update: (store, { data }) => {
        if (!data) {
          return null;
        }
        const existingTodos = store.readQuery<LoadGamesQuery>({
          query: LoadGamesDocument,
        });
        const newTodos = existingTodos!.loadGames.filter(
          (t) => t.name !== names
        );
        store.writeQuery<LoadGamesQuery>({
          query: LoadGamesDocument,
          data: { loadGames: newTodos },
        });
        // store.readQuery({
        //   query: LoadGamesDocument,
        // });
        // store.writeQuery({
        //   query: LoadGamesDocument,
        //   data: data,
        // });
        //  updateTodo({ variables: { id, type: input.value } });
      },
    });
  };
  const card = data.loadGames.map((result, i) => {
    // console.log(result);

    return (
      <div key={i}>
        <article className="card">
          <header
            style={{
              backgroundImage:
                "url('https://source.unsplash.com/user/erondu/600x400')",
            }}
            className="card-header"
          >
            <h4 className="card-header--title">News</h4>
          </header>
          <div className="card-body">
            <p className="date">June 12 2022</p>

            <h2>{result.price} €</h2>
            <p className="body-content2">
              {result.name}
              {}
            </p>
            <p className="body-content">
              Kayaks crowd Three Sister Springs, where people and manatees
              maintain controversial coexistence
            </p>

            <button
              onClick={() => {
                setName(result.name);
                console.log(result.name);

                removeGames();
              }}
              className="button button-primary"
            >
              <i className="fa fa-chevron-right"></i> Remove Game
            </button>
          </div>
        </article>
      </div>
    );
  });
  return <div className="container-games">{card}</div>;
};
