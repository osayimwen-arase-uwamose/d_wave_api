import argon2 from 'argon2';

import { User } from '../models/user.model.js';

import { Session } from '../models/session.model.js';

import { hashToken } from '../utils/crypto.js';

import { 
  createAccessToken,
  createRefreshToken,
} from './token.service.js';

import AppError from '../utils/app-error.js';

import { env } from '../config/env.js';

const refreshDuration = 
  env.REFRESH_TOKEN_EXPIRES_IN_DAYS
   * 24 * 60 * 60 * 1000;

const requestMetaData = (req) => { 
  return { 
    ipAddress: req.ip ?? null,
    userAgent: req.get('user-agent') ?? null,
  };
};

const register = async ({ 
  firstName,
  middleName,
  lastName,
  email,
  password,
}) => { 
  const isExistingUser = await User.exists({ email });

  if (isExistingUser) { 
    throw new AppError(
      409,
      'An account with these credentials already exists.',
      'ACCOUNT_EXISTS'
    );
  };

  const passwordHash = await argon2.hash(
    password,
    { 
      type: argon2.argon2id
    },
  );

  const user = await User.create({ 
    passwordHash,
    firstName,
    middleName,
    lastName,
    email,
  });

  //TODO: Email verification
  return { 
    id: user._id.toString(),
    email: user.email,
    role: user.role,
  };
};

const login = async ({ 
  req,
  email,
  password,
}) => { 
  const user = await User.findOne({ email });

  if (!user || !user.passwordHash) { 
    throw new AppError(
      401,
      'Invalid email or password.',
      'INVALID_CREDENTIALS',
    );
  };

  const isValidPassword = await argon2.verify(
    user.passwordHash,
    password
  );

  if (!isValidPassword) { 
    throw new AppError(
      401,
      'Invalid email or password',
      'INVALID_CREDENTIALS',
    );
  };

  const refresh = createRefreshToken();

  const metaData = requestMetaData(req);

  const session = await Session.create({ 
    user: user._id,
    refreshTokenHash: refresh.tokenHash,
    expiresAt: new Date(Date.now() + refreshDuration),
    lastUsedAt: new Date(),
    ipAddress: metaData.ipAddress,
    userAgent: metaData.userAgent,
  });

  const accessToken = createAccessToken(user);

  return { 
    accessToken,
    refreshToken: refresh.token,
    sessionId: session._id.toString(),
    user: { 
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    },
  };
};

const refresh = async ({ 
  req,
  refreshToken,
}) => { 
  const tokenHash = hashToken(refreshToken);

  const newRefresh = createRefreshToken();

  const metaData = requestMetaData(req);

  const session = await Session.findOneAndUpdate(
    { 
      refreshTokenHash: tokenHash,
      revokedAt: null,
      expiresAt: { 
        $gt: new Date(),
      },
    },
    { 
      $set: { 
        refreshTokenHash: newRefresh.tokenHash,
        lastUsedAt: new Date(),
        ipAddress: metaData.ipAddress,
        userAgent: metaData.userAgent,
      },
    },
    { 
      new: false
    },
  );

  if (!session) { 
    throw new AppError(
      401,
      'Invalid or expired refresh token.',
      'INVALID_REFRESH_TOKEN',
    );
  };

  const user = await User.findById(session.user);

  if (!user) { 
    throw new AppError(
      401,
      'Invalid or expired refresh token.',
      'INVALID_REFRESH_TOKEN',
    );
  };

  const accessToken = createAccessToken(user);

  return { 
    accessToken,
    refreshToken: newRefresh.token,
  }
};

const logout = async (refreshToken) => { 
  const tokenHash = hashToken(refreshToken);

  await Session.updateOne(
    {
      refreshTokenHash: tokenHash,
      revokedAt: null,
    },
    { 
      $set: { 
        revokedAt: new Date(),
      },
    },
  );
};

const logoutAll = async (userId) => { 
  await Session.updateMany(
    { 
      user: userId,
      revokedAt: null,
    },
    { 
      $set: { 
        revokedAt: new Date(),
      },
    },
  );
};

const getCurrentUser = async (userId) => { 
  const user = await User.findById(userId)
      .select('_id email role createdAt updatedAt')
      .lean();

  if (!user) { 
    throw new AppError(
      404,
      'User not found',
      'USER_NOT_FOUND',
    );
  };

  return { 
    id: user._id.toString(),
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export { 
  register,
  login,
  refresh,
  logout,
  logoutAll,
  getCurrentUser,
};
