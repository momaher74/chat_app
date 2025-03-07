const Joi = require("joi");

// Define validation schema
const schema = Joi.object({
    phone: Joi.string().required(),
    password: Joi.string().min(6).max(50).required(),
});

module.exports.loginValidtion = (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            message: "Validation failed",
            errors: error.details.map(err => err.message).join(", "), // Concatenates errors into a single string
        });
    }
    
    next(); // Proceed to next middleware/controller if validation passes
};
