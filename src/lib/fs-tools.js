import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { readJSON, writeJSON, writeFile } = fs;

const mediaJSONPath = join(
  join(dirname(fileURLToPath(import.meta.url)), "../data"),
  "media.json"
);

export const getMedia = () => readJSON(mediaJSONPath);

export const writeMedia = (content) => writeJSON(mediaJSONPath, content);
