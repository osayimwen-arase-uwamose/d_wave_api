import AppError from "../utils/app-error.js"

const requireRole = (requiredRole) => { 
  return async (req, res, next) => { 

    if (!req.user || !req.user.role) { 
      return next(
        new AppError(
          400,
          'Unauthorised or unrecognised role',
          'UNAUTHORISED'
        )
      )
    };

    if (req.user.role !== requiredRole) { 
      return next(
        new AppError(
          400,
          'Unauthorised or unrecognised role',
          'UNAUTHORISED',
        )
      )
    }

    next();
  };
};

export default requireRole;
