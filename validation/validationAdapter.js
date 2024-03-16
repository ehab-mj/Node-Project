import registerSchemaValidation from "./joi/users/register.js";
import loginSchemaValidation from "./joi/users/login.js";
import editUserSchemaValidation from "./joi/users/editUser.js";
import validateObjectIdSchema from "./joi/objectId.js";
import createCardSchemaValidation from "./joi/cards/card.validation.js";
import bizSchemaSchemaValidation from "./joi/users/patchBiz.js";
import bizNumberValidationSchema from "./joi/cards/CardbizNumber.js";
import patchUserSchemaValidation from "./joi/users/patchUser.js";

const VALIDATION = "joi";

const registerValidation = (userInput) => {
  if (VALIDATION === "joi") {
    return registerSchemaValidation(userInput);
  } else {
    throw new Error(`Validation ${VALIDATION} is not supported`);
  }
};

const loginValidation = (userInput) => {
  if (VALIDATION === "joi") {
    return loginSchemaValidation(userInput);
  } else {
    throw new Error(`Validation ${VALIDATION} is not supported`);
  }
};

const editUserValidation = (userInput) => {
  if (VALIDATION === "joi") {
    return editUserSchemaValidation(userInput);
  } else {
    throw new Error(`Validation ${VALIDATION} is not supported`);
  }
};

const patchUserValidation = (userInput) => {
  if (VALIDATION === "joi") {
    return patchUserSchemaValidation(userInput);
  } else {
    throw new Error(`Validation ${VALIDATION} is not supported`);
  }
};

const objectIdValidation = (id) => {
  if (VALIDATION === "joi") {
    return validateObjectIdSchema(id);
  } else {
    throw new Error(`Validation ${VALIDATION} is not supported`);
  }
};


const bizValidation = (userInput) => {
  if (VALIDATION === "joi") {
    return bizSchemaSchemaValidation(userInput);
  } else {
    throw new Error(`Validation ${VALIDATION} is not supported`);
  }
};

const patchBizCardValidation = (cardInput) => {
  if (VALIDATION === "joi") {
    return bizNumberValidationSchema(cardInput);
  } else {
    throw new Error(`Validation ${VALIDATION} is not supported`);
  }
};

const createCardValidation = (cardInput) => {
  if (VALIDATION === "joi") {
    return createCardSchemaValidation(cardInput);
  } else {
    throw new Error(`Validation ${VALIDATION} is not supported`);
  }
};

export {
  registerValidation,
  loginValidation,
  editUserValidation,
  objectIdValidation,
  patchUserValidation,
  patchBizCardValidation,
  createCardValidation,
  bizValidation
};
