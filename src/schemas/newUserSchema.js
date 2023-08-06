const joi = require('joi');

// Modificamos los mensajes de error de Joi que necesitemos.
const joiErrorMessages = {
    'string.base': 'El valor de "{#key}" debe ser una cadena',
    'any.required': 'El campo "{#key}" es requerido',
    'string.empty': 'El campo "{#key}" no debe estar vacío',
    'string.email':
        'Debe proporcionar un correo electrónico válido para "{#key}"',
    'string.pattern.base':
        'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un símbolo de puntuación para "{#key}"',
};

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const newUserSchema = joi.object({
    username: joi.string().required().messages(joiErrorMessages),
    password: joi
        .string()
        .pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/
        )
        .required()
        .messages(joiErrorMessages),
    email: joi.string().email().required().messages(joiErrorMessages),
});

module.exports = newUserSchema;
