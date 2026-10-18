import AppError from "../utils/app-error.js";

const validateSchema = (schema) => { 
  return async (req, res, next) => { 
    const result = await schema.safeParseAsync({ 
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) { 
      console.error(
        "Schema validation issues:",
        JSON.stringify(result.error.issues, null, 2),
      );

      return next(
        new AppError(
          400,
          'Schema validation failed',
          result.error.flatten(),
        )
      );
    };

    req.validated = result.data;

    next();
  };
};

export default validateSchema;
