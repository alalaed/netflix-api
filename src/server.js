import express from "express";
import { join } from "path";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import mediaRouter from "./services/media/index.js";

const server = express();
const port = process.env.PORT;

server.use(express.json());

server.use("/media", mediaRouter);

console.table(listEndpoints(server));

server.listen(port, () => {
  console.log("server is running on port" + port);
});
