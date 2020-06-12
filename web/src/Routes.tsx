import React from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  RouteComponentProps,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Bye } from "./pages/Bye";
import { Header } from "./Header";
import { Post } from "./pages/Posts";
import { AdminPanel } from "./pages/AdminPanel";
import { Game } from "./pages/Game";
export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/post" component={Post} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/bye" component={Bye} />
          <Route exact path="/admin" component={AdminPanel} />
          <Route exact path="/game" component={Game} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
