module.exports = {
  deleteFileError() {
    throw {
      httpStatus: 500, // Internal server error
      code: "FILE_DELETE_FAILED",
      message: "Error al eliminar el archivo del disco",
    };
  },
  emailAlreadyRegisteredError() {
    throw {
      httpStatus: 409, // Conflict
      code: "EMAIL_ALREADY_REGISTERED",
      message: "El email ya está registrado",
    };
  },
  incorrectRecoveryCodeError() {
    throw {
      httpStatus: 400, // Bad request
      code: "INCORRECT_RECOVERY_CODE",
      message: "Código de recuperación incorrecto",
    };
  },
  invalidCredentialsError() {
    throw {
      httpStatus: 401, // Unauthorized
      code: "INVALID_CREDENTIALS",
      message: "Credenciales inválidas",
    };
  },
  invalidTokenError() {
    throw {
      httpStatus: 401, // Unauthorized
      code: "INVALID_TOKEN",
      message: "Token inválido",
    };
  },

  missingFieldsError() {
    throw {
      httpStatus: 400, // Bad request
      code: "MISSING_FIELDS",
      message: "Faltan campos",
    };
  },
  notAuthenticatedError() {
    throw {
      httpStatus: 401, // Unauthorized
      code: "NOT_AUTHENTICATED",
      message: "Debe enviar un token en el header 'Authorization'",
    };
  },
  notFoundError() {
    throw {
      httpStatus: 404, // Not found
      code: "RESOURCE_NOT_FOUND",
      message: "El recurso requerido no existe",
    };
  },
  pendingActivationError() {
    throw {
      httpStatus: 403, // Forbidden
      code: "PENDING_ACTIVATION",
      message:
        "Usuario pendiente de activar. Por favor, verifica tu cuenta antes de continuar.",
    };
  },

  saveFileError() {
    throw {
      httpStatus: 500, // Internal server error
      code: "FILE_SAVE_FAILED",
      message: "Error al guardar el ejercicio",
    };
  },

  unauthorizedUserError() {
    throw {
      httpStatus: 403, // Forbidden
      code: "UNAUTHORIZED",
      message: "El usuario no está autorizado para hacer esta operación",
    };
  },
  userAlreadyRegisteredError() {
    throw {
      httpStatus: 409, // Conflict
      code: "USER_ALREADY_REGISTERED",
      message: "El nombre de usuario ya está registrado",
    };
  },
};
