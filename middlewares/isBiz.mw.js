import handleError from "../utils/handleError.js";

const isBizMiddleware = async (req, res, next) => {
  if (!req.userData) {
    throw new Error("error 0x19856");
  }
  if (!req.userData.isBusiness) {
    return handleError(res, 401, "You are not a biz user");
  }
  next();
};
export default isBizMiddleware;
