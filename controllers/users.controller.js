import {
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  patchIsBiz,
  getUserById,
  getAllUsers,

} from "../model/dbAdapter.js";
import handleError from "../utils/handleError.js";
import { generateHash, cmpHash } from "../utils/bcrypt.js";
import { generateToken } from "../token/jwt.js";
import nodeMailer from "nodemailer";
import debug from "debug";
import UserUpdateLogin from "../utils/UserUpdateLogin.js";
import UpdateUserFailedToLogin from "../utils/UpdateUserFailedToLogin.js";
const log = debug("app:loginController");

const registerController = async (req, res) => {
  try {
    let userFromDB = await getUserByEmail(req.body.email);
    // console.log(userFromDB);
    if (userFromDB) throw new Error("user already exists");
    let passwordHash = await generateHash(req.body.password);
    // console.log(req.body);
    req.body.password = passwordHash;
    // console.log(req.body);
    let newUser = await createUser(req.body);
    newUser.password = undefined;
    newUser.UserFailedToLogin = 0;
    await updateUser(newUser._id, newUser);
    delete newUser.password; // not working, Sasha do not know why, ask gpt
    // console.log(newUser);

    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        user: "ehabmj1212@gmail.com",
        pass: "123456@Mj"
      }
    });

    const mailBox = {
      from: "ehabmj1212@gmail.com",
      to: newUser.email,
      subject: "Hello",
      text: "You're signed up successfully",
      html: `
      <div style="background-color: #141414; color: white; padding: 10px; font-size:

<h2>Hello ${newUser.name.first + " " + newUser.name.last}</h2>

      </div>
      `
    }

    transporter.sendMail(mailBox, (err, info) => {
      if (err) {
        let logger = debug("app:registerController");
        logger("error", err);
      } else {
        logger("Message sent: " + info.response);
      }
    })

    res.send("new User");
  } catch (err) {
    handleError(res, 400, err.message);
  }
};

const loginController = async (req, res) => {
  try {
    let userFromDB = await getUserByEmail(req.body.email);
    // console.log(userFromDB);
    if (!userFromDB)
      throw new Error("invalid email or password");

    let passwordMatch = await cmpHash(req.body.password, userFromDB.password);
    if (!passwordMatch) {
      ///////
      let UnlockedUser = UserUpdateLogin(userFromDB.FailedLoginAttempts);

      userFromDB.UserFailedToLogin++;
      userFromDB = await updateUser(userFromDB);

      if (userFromDB.UserFailedToLogin === 3 && !UnlockedUser) {
        throw new Error("Your account has been locked!");
      }
      throw new Error("check your email and password");
    }

    userFromDB.UserFailedToLogin = 0;
    let userType = await UpdateUserFailedToLogin(userFromDB);

    let token = await generateToken({
      _id: userType._id,
      isAdmin: userType.isAdmin,
      isBusiness: userType.isBusiness,
    });

    //////
    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      auth: {
        userType: 'ehabmj1212@gmail.com',
        pass: "123456@Mj"
      }
    });

    const mailOptions = {
      from: 'ehabmj1212@gmail.com',
      to: userType.email,
      subject: 'Reset Password Link',
      text: `http://localhost:3000/reset_password/${userType._id}/${token}`,
      html: `
<div style="background-color: #f5f5f5; padding: 20px; border-radius: 10px;">

Hello ${userType.name.first + " " + userType.name.last},

</div>
`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        let logger = debug("app:loginController");
        logger("error", error);
      } else {
        return res.send({ Status: "Success" + info.response })
      }
    });
    /////
    res.json(token);
  } catch (err) {
    log(err);
    handleError(res, 400, err.message);
  }
};

const updateUserController = async (req, res) => {
  /**
   * validation | mw, joi
   * update user:
   * if(user is admin) then update user
   * if user is not admin then if user._id === payload(token)._id then update user
   * response user
   */
  try {
    // if (!req.userData.isAdmin && req.userData._id !== req.params.id)
    //   throw new Error("you not allowed to update");
    let userFromDB = await updateUser(req.params.id, req.body);
    userFromDB.password = undefined;
    res.json(userFromDB);
  } catch (err) {
    console.log(err);
    handleError(res, 400, err.message);
  }
};

const patchIsBizController = async (req, res) => {
  try {
    let userFromDB = await patchIsBiz(req.params.id, req.body.isBusiness);
    userFromDB.password = undefined;
    res.json(userFromDB);
  } catch (err) {
    console.log(err);
    handleError(res, 400, err.message);
  }
};

const deleteUserController = async (req, res) => {
  try {
    let userFromDB = await deleteUser(req.params.id);
    userFromDB.password = undefined;
    res.json(userFromDB);
  } catch (err) {
    console.log(err);
    handleError(res, 400, err.message);
  }
};
const getAllUsersController = async (req, res) => {
  try {
    let users = await getAllUsers();
    res.json(users);
  } catch (err) {
    console.log(err);
    handleError(res, 400, err.message);
  }
};

const getUserByIdController = async (req, res) => {
  try {
    let user = await getUserById(req.params.id);
    user.password = undefined;
    res.json(user);
  } catch (err) {
    handleError(res, 400, err.message);
  }
};

// const forgetPasswordController = async (req, res) => {
//   try {
//     let userFromDB = await getUserByEmail(req.body.email);
//     // console.log(userFromDB);
//     if (!userFromDB)
//       throw new Error("invalid email or password");
//   } catch (err) {
//     handleError(res, 400, err.message);
//   }
// }



export {
  loginController,
  registerController,
  updateUserController,
  deleteUserController,
  patchIsBizController,
  getUserByIdController,
  getAllUsersController,
};
