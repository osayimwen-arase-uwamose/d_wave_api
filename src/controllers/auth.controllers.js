import { REFRESH_COOKIE_NAME } from '../config/consts.js';

import {
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
} from '../utils/cookies.js';

import * as authService from '../services/auth.service.js';

import { registerSchema, loginSchema } from '../validators/auth.validators.js';


const register = async (req, res) => {
  const { 
    body,
    params,
    query
  } = req.validated;

  const user = await authService.register({
    firstName: body.firstName,
    middleName: body.middleName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
  });

  res.status(201).json({
    data: {
      user,
    },
  });
};


const login = async (req, res) => {
  const { 
    body,
    params,
    query,
  } = req.validated;

  const result = await authService.login({
    req,
    email: body.email,
    password: body.password,
  });

  setRefreshTokenCookie(
    res,
    result.refreshToken,
  );

  res.status(200).json({
    data: {
      accessToken: result.accessToken,
      user: result.user,
    },
  });
};


const refresh = async (req, res) => {
  const refreshToken = req.cookies[REFRESH_COOKIE_NAME];

  if (!refreshToken) {
    return res.status(401).json({
      error: {
        code: 'REFRESH_TOKEN_REQUIRED',
        message: 'Refresh token required',
      },
    });
  }

  const result = await authService.refresh({
    req,
    refreshToken,
  });

  setRefreshTokenCookie(
    res,
    result.refreshToken,
  );

  res.status(200).json({
    data: {
      accessToken: result.accessToken,
    },
  });
};


const me = async (req, res) => {
  const user = await authService.getCurrentUser(
    req.user.id,
  );

  res.status(200).json({
    data: {
      user,
    },
  });
};


const logout = async (_req, _res) => {
  const refreshToken = _req.cookies[REFRESH_COOKIE_NAME];

  if (refreshToken) {
    await authService.logout(
      refreshToken,
    );
  }

  clearRefreshTokenCookie(_res);

  _res.status(204).send();
};


const logoutAll = async (_req, _res) => {
  await authService.logoutAll(
    _req.user.id,
  );

  clearRefreshTokenCookie(_res);

  _res.status(204).send();
};


export {
  register,
  login,
  refresh,
  me,
  logout,
  logoutAll,
};
