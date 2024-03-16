import morgan from "./morgan/morgan.js";

const LOGGER = "morgan";

const logger = () => {
  if (LOGGER === "morgan") {
    return morgan;
  }
  throw new Error(`Logger ${LOGGER} is not supported`);
};

export default logger;
