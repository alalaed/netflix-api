import express from "express";
import { join } from "path";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import mediaRouter from "./services/media/index.js";

const server = express();
const port = process.env.PORT;

const whitelist = [process.env.FE_DEV_URL, process.env.FE_PROD_URL];

const publicMediaPath = join(process.cwd(), "./public");

server.use(
  cors({
    origin: function (origin, next) {
      console.log("ORIGIN: ", origin);
      if (!origin || whitelist.indexOf(origin) !== -1) {
        console.log("Origin allowed!");
        next(null, true);
      } else {
        console.log("Origin NOT allowed!");
        next(new Error("CORS ERROR!"));
      }
    },
  })
);

server.use(express.json());

server.use("/media", mediaRouter);
server.use(express.static(publicMediaPath));

console.table(listEndpoints(server));

server.listen(port, () => {
  console.log("server is running on port" + port);
});
server.on("error", (error) => console.log(error));
