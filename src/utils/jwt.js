import jwt from "jsonwebtoken";
// import { Response } from "express";

const generateAccessToken = (user) => {
  return jwt.sign({ userId: user.id }, process.env.JWTACCESSSECRET, {
    expiresIn: "1h",
  });
};

const generateRefreshToken = (user, app) => {
  const jwtConfig = {};
  if (!app) {
    jwtConfig.expiresIn = "7d";
  }
  return jwt.sign({ userId: user.id }, process.env.JWTREFRESHSECRET, jwtConfig);
};

export const generateTokens = (user, app) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user, app);

  return {
    accessToken,
    refreshToken,
  };
};

export const decodeRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWTREFRESHSECRET);
  } catch (error) {
    return null;
  }
};
export const decodeAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWTACCESSSECRET);
  } catch (error) {
    return null;
  }
};

export const sendRefreshToken = (res, refreshToken) => {
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true, // Cookie hanya bisa diakses oleh server, bukan client-side scripts
    // sameSite: "strict", // Menghindari pengiriman cookie ke domain lain
    // secure: process.env.NODE_ENV === "production", // Cookie hanya dikirim melalui HTTPS jika di production
    // path: "/auth/refresh", // Pastikan token hanya bisa diakses pada endpoint ini
    maxAge: 14 * 24 * 60 * 60 * 1000, // 7 hari dalam milidetik
  });
};
