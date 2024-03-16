import Joi from "joi";
import phoneRegex from "../../../utils/phoneRegex.js";
const patchUserSchema = Joi.object({
    name: Joi.object()
        .keys({
            first: Joi.string().min(2).max(356).required(),
            middle: Joi.string().min(2).max(356).allow(""),
            last: Joi.string().min(2).max(356).required(),
        })
        .required(),
    phone: Joi.string().pattern(phoneRegex).required(),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .min(5)
        .max(500)
        .required(),
    image: Joi.object().keys({
        url: Joi.string()
            .uri({ scheme: ["http", "https"] })
            .allow(""),
        alt: Joi.string().min(2).max(256).allow("").when("url", {
            is: Joi.exist(),
            then: Joi.required(),
        }),
    }),
    address: Joi.object()
        .keys({
            state: Joi.string().min(2).max(256).allow(""),
            country: Joi.string().min(2).max(256).required(),
            city: Joi.string().min(2).max(256).required(),
            street: Joi.string().min(2).max(256).required(),
            houseNumber: Joi.number().min(2).max(256).required(),
            zip: Joi.number().min(10000).max(9999999).required(),
        })
        .required(),
    isBusiness: Joi.boolean().required(),
    isAdmin: Joi.boolean().required(),
});

const patchUserSchemaValidation = (userInput) => {
    return patchUserSchema.validateAsync(userInput);
};
export default patchUserSchemaValidation;
