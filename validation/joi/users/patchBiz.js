import Joi from "joi";

const bizSchema = Joi.object({
    isBusiness: Joi.boolean().required(),
});

const bizSchemaSchemaValidation = (userInput) => {
    return bizSchema.validateAsync(userInput);
};

export default bizSchemaSchemaValidation;
