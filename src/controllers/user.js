import { createRefreshToken } from "../db/refreshToken.js";
import { createUser, getUsers, getUserByUsername, updateUser } from "../db/user.js";
import { userTransformer } from "../transformers/user.js";
import { generateTokens, sendRefreshToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";

export default {
  index: async (req, res) => {
    const users = await getUsers();
    res.send(users);
  },

  register: async (req, res) => {
    const { username, name, email, password, confirmpassword } = req.body;

    if (!username || !name || !email || !password || !confirmpassword) {
      return res.status(400).json({
        statusCode: 400,
        statusMessage: "Invalid Params",
      });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({
        statusCode: 400,
        statusMessage: "Password does not match",
      });
    }

    const userData = {
      username,
      email,
      password,
      name,
      profileImage: `https://avatar.oxro.io/avatar.svg?name=${username}&caps=3&bold=true`,
    };

    try {
      const newUser = await createUser(userData);
      res.json(userTransformer(newUser));
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        statusMessage: "Internal Server Error",
      });
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        statusCode: 400,
        statusMessage: "Invalid Params",
      });
    }

    const user = await getUserByUsername(username);

    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        statusMessage: "User Not Found",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        statusCode: 401,
        statusMessage: "Invalid Password",
      });
    }

    const { accessToken, refreshToken } = generateTokens(user);

    await createRefreshToken({
      token: refreshToken,
      userId: user.id,
    });

    sendRefreshToken(res, refreshToken);

    res.json({
      user: userTransformer(user),
      access_token: accessToken,
    });
  },
  update: async (req, res) => {
    const result = await updateUser(req.params.id, req.body);
    return result;
  },
};
