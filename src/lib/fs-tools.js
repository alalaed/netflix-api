import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { readJSON, writeJSON, writeFile } = fs;

const mediaJSONPath = join(
  join(dirname(fileURLToPath(import.meta.url)), "../data"),
  "media.json"
);

const publicPath = join(process.cwd(), "./public/posters");
export const getMedia = () => readJSON(mediaJSONPath);

export const writeMedia = (content) => writeJSON(mediaJSONPath, content);

export const savedPosters = async (filename, contentAsABuffer) => {
  writeFile(join(publicPath, filename), contentAsABuffer);
};
