import formidable from "formidable";
import { createRefreshToken, getRefreshTokenByToken } from "../db/refreshToken.js";
import { createUser, getUsers, getUserByUsername, updateUser, getUserById, getUserByEmail } from "../db/user.js";
import { userTransformer } from "../transformers/user.js";
import { decodeRefreshToken, generateTokens, sendRefreshToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";
import { cloudinaryUpload } from "../utils/cloudinary.js";

export default {
  index: async (req, res) => {
    res.send(req.auth);
  },
  profileImage: async (req, res) => {
    const userId = req.auth.id;

    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).send({ success: false, message: err.message });
      }
      const { image } = files;

      if (!image) {
        return res.status(400).json({
          statusCode: 400,
          statusMessage: "Invalid Params",
        });
      }
      const imageUpload = await cloudinaryUpload(image[0].filepath);
      const updatedUser = await updateUser(userId, { profileImage: imageUpload.secure_url });
      return res.status(200).json({
        user: userTransformer(updatedUser),
        statusCode: 200,
        statusMessage: "Success",
      });
    });
  },
  register: async (req, res) => {
    const { username, name, email, password, confirmpassword } = req.body;

    if (!username || !name || !email || !password || !confirmpassword) {
      return res.status(400).json({
        statusCode: 400,
        statusMessage: "Invalid Params",
      });
    }

    const userByUsername = await getUserByUsername(username);
    const userByEmail = await getUserByEmail(email);

    if (userByEmail || userByUsername) {
      return res.status(400).json({
        statusCode: 400,
        statusMessage: "Username or Email was not available",
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
      console.log("> Error : " + error.message);
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

    const { accessToken, refreshToken } = generateTokens(user, req.headers["user-agent"] == "jlp-app");

    await createRefreshToken({
      token: refreshToken,
      userId: user.id,
    });

    const result = {
      user: userTransformer(user),
      access_token: accessToken,
    };

    if (req.headers["user-agent"] == "jlp-app") {
      result.refresh_token = refreshToken;
    } else {
      sendRefreshToken(res, refreshToken);
    }

    res.json(result);
  },
  editProfile: async (req, res) => {
    const { name, username, phone, password, confirmpassword } = req.body;
    const updatedUserData = {};

    if (name) {
      updatedUserData.name = name;
    }
    if (username) {
      const userWithUsername = await getUserByUsername(username);
      if (userWithUsername && userWithUsername.id !== req.auth.id) {
        return res.status(400).json({
          statusCode: 400,
          statusMessage: "Username was not avalable!",
        });
      }
      updatedUserData.username = username;
    }
    if (phone) {
      updatedUserData.phone = phone;
    }
    if (password && confirmpassword) {
      if (password !== confirmpassword) {
        return res.status(400).json({
          statusCode: 400,
          statusMessage: "Password Does Not Match!",
        });
      }
      updatedUserData.password = password;
    }

    const result = await updateUser(req.auth.id, updatedUserData);
    res.json({
      user: userTransformer(result),
      message:
        Object.keys(updatedUserData)
          .map((key) => key.charAt(0).toUpperCase() + key.slice(1))
          .join(", ") + " Updated",
    });
  },
  refreshToken: async (req, res) => {
    let refreshToken = null;
    if (req.headers["user-agent"] == "jlp-app") {
      const { refresh_token } = req.query;
      refreshToken = refresh_token;
    } else {
      refreshToken = req.cookies.refresh_token;
    }

    if (!refreshToken) {
      return res.status(401).json({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }

    const rToken = await getRefreshTokenByToken(refreshToken);

    if (!rToken) {
      return res.status(401).json({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }

    const token = decodeRefreshToken(refreshToken);
    try {
      const user = await getUserById(token.userId);

      const { accessToken } = generateTokens(user);
      return res.json({ access_token: accessToken });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        statusMessage: "Something went wrong",
      });
    }
  },
};
