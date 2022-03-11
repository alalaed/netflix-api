import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { createReadStream } from "fs";

const { readJSON, writeJSON } = fs;

const mediaJSONPath = join(
  join(dirname(fileURLToPath(import.meta.url)), "../data"),
  "media.json"
);

export const getMedia = () => readJSON(mediaJSONPath);
