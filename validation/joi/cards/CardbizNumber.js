import Joi from "joi";

const bizNumberSchema = Joi.object({
    isbizNumber: Joi.number().min(10000).max(9999999).required(),
});

const bizNumberValidationSchema = (isbizNumber) => {
    return bizNumberSchema.validateAsync(isbizNumber);
};

export default bizNumberValidationSchema;