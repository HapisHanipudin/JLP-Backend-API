import jwt from "jsonwebtoken";
import { Response } from "express";

const generateAccessToken = (user) => {
  return jwt.sign({ userId: user.id }, process.env.JWTACCESSSECRET, {
    expiresIn: "10m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ userId: user.id }, process.env.JWTREFRESHSECRET, {
    expiresIn: "4h",
  });
};

export const generateTokens = (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    accessToken,
    refreshToken,
  };
};

export const sendRefreshToken = (res, refreshToken) => {
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true, // Cookie hanya bisa diakses oleh server, bukan client-side scripts
    sameSite: "strict", // Menghindari pengiriman cookie ke domain lain
    secure: process.env.NODE_ENV === "production", // Cookie hanya dikirim melalui HTTPS jika di production
    path: "/api/auth/refresh-token", // Pastikan token hanya bisa diakses pada endpoint ini
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari dalam milidetik
  });
};
