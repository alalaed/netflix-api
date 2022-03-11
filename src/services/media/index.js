import express from "express";
import uniqid from "uniqid";
import createHttpError from "http-errors";
import { getMedia } from "../../lib/fs-tools.js";

const mediaRouter = express.Router();

mediaRouter.get("/", async (req, res, next) => {
  try {
    const allMedia = await getMedia();
    res.send(allMedia);
  } catch (error) {
    next(error);
  }
});

export default mediaRouter;
