import { 
  REFRESH_COOKIE_NAME,
} from "../config/consts.js";

import { env } from "../config/env.js";

export const refreshCookieOptions = { 
  httpOnly: true,

  secure: env.COOKIE_SECURE,

  sameSite: env.COOKIE_SAME_SITE,

  domain: env.COOKIE_DOMAIN || undefined,

  path: '/auth',
};

const setRefreshTokenCookie = (res, token) => { 
  res.cookie(
    REFRESH_COOKIE_NAME,
    token,
    { 
      ...refreshCookieOptions,
      maxAge: env.REFRESH_TOKEN_EXPIRES_IN_DAYS
       * 24 * 60 * 60 * 1000,
    },
  );
};

const clearRefreshTokenCookie = (res) => { 
  res.clearCookie(
    REFRESH_COOKIE_NAME,
    refreshCookieOptions
  );
};

export { 
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
};
