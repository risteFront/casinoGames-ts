import React, { useState } from "react";
import { RouteComponentProps } from "react-router";

import { useGamesMutation } from "../generated/graphql";
import "./adminForm.css";

interface GameProps {}
export const Game: React.FC<RouteComponentProps> = ({ history }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [success, setSuccess] = useState(false);
  const [games] = useGamesMutation();

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("form submitted");
    const response = await games({
      variables: {
        name,
        price,
        description,
        url,
      },
      update: (store, { data }) => {
        if (!data) {
          setSuccess(false);
          return null;
        }
        console.log(data);
      },
    });
    setSuccess(true);
    setTimeout(() => {
      history.push("/");
    }, 2000);
  };
  return (
    <div className="page-wrapper bg-dark p-t-100 p-b-50">
      <div className="wrapper wrapper--w900">
        <div className="cards card-6">
          <div className="card-heading">
            <h2 className="title">Apply for job</h2>
          </div>
          <div className="card-body">
            <form method="POST" onSubmit={(e) => handleClick(e)}>
              <div className="form-row">
                <div className="name">Game name</div>
                <div className="value">
                  <input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    required
                    className="input--style-6"
                    type="text"
                    name="full_name"
                  ></input>
                </div>
              </div>
              <div className="form-row">
                <div className="name">Price</div>
                <div className="value">
                  <div className="input-group">
                    <input
                      value={price}
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                      className="input--style-6"
                      type="text"
                      name="header"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="name">Description</div>
                <div className="value">
                  <div className="input-group">
                    <textarea
                      value={description}
                      onChange={(e) => {
                        setDesc(e.target.value);
                      }}
                      className="textarea--style-6"
                      name="message"
                      placeholder="Message sent to the employer"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="name">URL of Image</div>
                <div className="value">
                  <div className="input-group">
                    <input
                      className="input--style-6"
                      type="text"
                      required={true}
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value);
                      }}
                      name="email"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <button className="btn btn--radius-2 btn--green" type="submit">
                  Send Application
                </button>
                {success ? (
                  <span>
                    Game is successfuly send, redirecting to Home page
                  </span>
                ) : (
                  <span>Game is not send</span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
