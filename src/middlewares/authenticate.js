import AppError from "../utils/app-error.js";

import { verifyAccessToken } from "../services/token.service.js";

const authenticate = (req, res, next) => { 
  const authorization = req.get('authorization');

  if (!authorization || !authorization.startsWith('Bearer ')) { 
    return next(
      new AppError(
        401,
        'Authentication required.',
        'AUTH_REQUIRED',
      )
    );
  };

  const token = authorization.slice(7);

  try { 
    const payload = verifyAccessToken(token);

    req.user = { 
      id: payload.sub,
      role: payload.role,
    };

    next();
  } catch { 
    next(
      new AppError(
        401,
        'Invalid or expired access token.',
        'INVALID_ACCESS_TOKEN',
      )
    );
  };
};

export default authenticate;
