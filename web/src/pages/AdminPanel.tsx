import React, { useEffect, useState } from "react";
import { useUsersQuery, useUserPostMutation } from "../generated/graphql";
import "../App.css";
import "./adminForm.css";
interface Props {}

export const AdminPanel: React.FC<Props> = () => {
  const [name, setName] = useState("");
  const [header, setHeader] = useState("");
  const [body, setBody] = useState("");
  const [email, setEmail] = useState("");
  const { data } = useUsersQuery();
  const [success, setSuccess] = useState(false);
  const [userPosts] = useUserPostMutation();

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("form submitted");
    const response = await userPosts({
      variables: {
        name,
        header,
        body,
        email,
      },
      update: (store, { data }) => {
        if (!data) {
          setSuccess(false);
          return null;
        }
        console.log(data);
      },
    });
    setName("");
    setHeader("");
    setBody("");
    setEmail("");
    setSuccess(true);
  };
  if (!data) {
    return <div>loading...</div>;
  }

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
                <div className="name">Post name</div>
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
                <div className="name">Header</div>
                <div className="value">
                  <div className="input-group">
                    <input
                      value={header}
                      onChange={(e) => {
                        setHeader(e.target.value);
                      }}
                      className="input--style-6"
                      type="text"
                      name="header"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="name">Message</div>
                <div className="value">
                  <div className="input-group">
                    <textarea
                      value={body}
                      onChange={(e) => {
                        setBody(e.target.value);
                      }}
                      className="textarea--style-6"
                      name="message"
                      placeholder="Message sent to the employer"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="name">User ID (e-mail address)</div>
                <div className="value">
                  <div className="input-group">
                    <input
                      className="input--style-6"
                      type="text"
                      required={true}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
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
                  <span>Notification is successfuly send</span>
                ) : (
                  <span>Messege is not send</span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
