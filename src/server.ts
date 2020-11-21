import logger from "./config/winston";
import express from "express";
import cors from "cors";
import { HOST, PORT, NODE_ENV, APP_NAME } from "./config/config";
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/healthz", (req, res) => {
  res.status(200).send(`${APP_NAME} is alive.`);
  logger.debug(`${APP_NAME} is alive.`);
});

app.use("*", (req, res) => {
  logger.error("No path found at ", req.path);
  return res.status(404).json({ message: `${APP_NAME}: Path not found` });
});

app.listen(PORT, HOST, () => {
  logger.info(`${APP_NAME} listening on port ${PORT} in ${NODE_ENV} mode.`);
});
