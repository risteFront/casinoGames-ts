import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./UserResolver";
import { PostResolvers } from "./PostResolvers";
import { GameResolver } from "./GameResolver";
import { createConnection } from "typeorm";

import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import cors from "cors";
import { User } from "./entity/User";
import { sendRefreshToken } from "./sendRefreshToken";
import { createAccessToken, createRefreshToken } from "./auth";
//import { createServer } from "http";
//const socketio = require("socket.io");
const http = require("http");

(async () => {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.get("/", (_req, res) => res.send("hello"));
  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.jid;
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }

    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: "" });
    }

    // token is valid and
    // we can send back an access token
    const user = await User.findOne({ id: payload.userId });

    if (!user) {
      return res.send({ ok: false, accessToken: "" });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }

    sendRefreshToken(res, createRefreshToken(user));
    console.log(user);

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, PostResolvers, GameResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });
  const server = http.createServer(app);
  // const io = socketio(server);
  // io.on("connection", (socket: any) => {
  //   console.log("user is connected");
  //   // console.log(socket.connected); // logs true or false
  //   socket.on("join", (data: any) => {
  //     console.log(data);
  //   });
  //   // console.log(socket.connected); // logs true or false
  //   socket.emit("message", { name: "bonusgame" });
  //   socket.on("disconnect", () => {
  //     console.log("User is disconected");
  //   });
  // });
  // var serverPort = 4000;
  // var webSocketPort = 3000;

  // var server = require("http")
  //   .Server(app)
  //   .listen(webSocketPort, function () {
  //     console.log("WebSocket listening on port %d", 3000);
  //   });

  // app.listen(serverPort, function () {
  //   console.log("Node server is listening on port %d", serverPort);
  // });
  // server.on("connection", function () {
  //   console.log("a user connected");
  // });

  // server.listen(port, () => {
  //   console.log(`Server listening on port ${port}`);
  // });
  server.listen(4000, () => {
    console.log("server is runing on port 4000");
  });
})();
// const server = createServer(app);
// let io = require("socket.io")(server);
// const port = 4000;

// io.on("connection", function () {
//   console.log("a user connected");
// });

// server.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

// createConnection().then(async connection => {

//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));
