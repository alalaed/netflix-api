import express from "express";
import uniqid from "uniqid";
import createHttpError from "http-errors";
import { getMedia, writeMedia } from "../../lib/fs-tools.js";

const mediaRouter = express.Router();

mediaRouter.get("/", async (req, res, next) => {
  try {
    const allMedia = await getMedia();
    res.send(allMedia);
  } catch (error) {
    next(error);
  }
});

mediaRouter.get("/:imdbID", async (req, res, next) => {
  try {
    const allMedia = await getMedia();
    const foundMedia = allMedia.filter(
      (media) => media.imdbID === req.params.imdbID
    );
    res.send(foundMedia);
  } catch (error) {
    next(error);
  }
});

mediaRouter.delete("/:imdbID", async (req, res, next) => {
  try {
    const allMedia = await getMedia();
    const remainingMedia = allMedia.filter(
      (media) => media.imdbID !== req.params.imdbID
    );
    await writeMedia(remainingMedia);
    res.send({ message: `Movie with the ID ${req.params.imdbID} is deleted` });
  } catch (error) {
    next(error);
  }
});

export default mediaRouter;
