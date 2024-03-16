import handleError from "../utils/handleError.js";

const errorMiddleware = (err, req, res, next) => {
  handleError(res, 500, err.message);
};

export default errorMiddleware;
