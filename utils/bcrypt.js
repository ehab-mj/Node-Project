import bcrypt from "bcryptjs";

const generateHash = (password) => bcrypt.hash(password, 10);

const cmpHash = (password, hash) => bcrypt.compare(password, hash);

export { generateHash, cmpHash };
