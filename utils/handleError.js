import Chalk from "chalk";
import debug from "debug";

const handleError = (res, status, message) => {
  const log = debug("app:handleError");
  log(Chalk.redBright(message));
  res.status(status).send(message);
};

export default handleError;
