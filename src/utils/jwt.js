import jwt from "jsonwebtoken";

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
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    return {
        accessToken,
        refreshToken
    }
}