import express from "express";
import uniqid from "uniqid";
import createHttpError from "http-errors";
import { getMedia, writeMedia } from "../../lib/fs-tools.js";
import { validator, commentValidator } from "./validation.js";
import { validationResult } from "express-validator";

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
mediaRouter.get("/:imdbID/comments", async (req, res, next) => {
  try {
    const allMedia = await getMedia();
    const foundMedia = allMedia.filter(
      (media) => media.imdbID === req.params.imdbID
    );
    res.send(foundMedia[0].comments);
  } catch (error) {
    next(error);
  }
});

mediaRouter.post("/", validator, async (req, res, next) => {
  try {
    const errorsList = validationResult(req);
    if (errorsList.isEmpty()) {
      const allMedia = await getMedia();
      const newMedia = { ...req.body, createdAt: new Date(), imdbID: uniqid() };
      allMedia.push(newMedia);
      await writeMedia(allMedia);
      res.status(201).send(newMedia);
    } else {
      next(createHttpError(400, "OOPS something went wrong", { errorsList }));
    }
  } catch (error) {
    next(error);
  }
});

mediaRouter.put("/:imdbID", async (req, res, next) => {
  try {
    const allMedia = await getMedia();
    const index = allMedia.findIndex(
      (media) => media.imdbID === req.params.imdbID
    );
    const oldMedia = allMedia[index];
    const updatedMedia = { ...oldMedia, ...req.body, updatedAt: new Date() };
    allMedia[index] = updatedMedia;
    await writeMedia(allMedia);
    res.send(updatedMedia);
  } catch (error) {
    next(error);
  }
});

mediaRouter.put(
  "/:imdbID/comments",
  commentValidator,
  async (req, res, next) => {
    try {
      const allMedia = await getMedia();
      const index = allMedia.findIndex(
        (media) => media.imdbID === req.params.imdbID
      );
      const foundMedia = allMedia[index];
      const comments = foundMedia.comments;
      const newComment = {
        ...req.body,
        commentID: uniqid(),
        createdAt: new Date(),
      };
      comments.push(newComment);

      await writeMedia(allMedia);
      res.send(newComment);
    } catch (error) {
      next(error);
    }
  }
);

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

mediaRouter.delete("/:imdbID/comments/:commentID", async (req, res, next) => {
  try {
    const allMedia = await getMedia();
    const index = allMedia.findIndex(
      (media) => media.imdbID === req.params.imdbID
    );
    const comments = allMedia[index].comments;
    const remainingComments = comments.filter(
      (comment) => comment.commentID !== req.params.commentID
    );
    comments = remainingComments;
    writeMedia(allMedia);
  } catch (error) {
    next(error);
  }
});

export default mediaRouter;
