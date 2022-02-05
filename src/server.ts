require("dotenv-safe").config();
import "./database";

import express, { NextFunction, Request, Response } from "express";
import * as socketIo from "socket.io";

import cors from "cors";
import http from "http";


import { routes } from "./routes";

const auth = require("./middleware/auth");

const app = express();
const port = process.env.PORT || 3334;
const bodyParser = require("body-parser");

// // const User = require("../models/userModel");
// app.get("/", (req, res) => {
//   res.send("<h1>GET SUCESS</h1>");
// });


routes.get("/", auth, async (req, res) => {
  //const user = await UserModal.findById(req.user)
 res.send("<h1>GET SUCESS</h1>");
});

const server = http.createServer(app);
const io = new socketIo.Server(server);

app.use((req: Request, res: Response, next: NextFunction) => {
  req.io = io;
  return next();
});

io.on("connection", () => {
  console.log("Conectado com Sucesso!");
});

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(bodyParser.json());

server.listen(port, () => {
  console.log(`🔥 Servidor iniciado em http://localhost:${port}`);
});
