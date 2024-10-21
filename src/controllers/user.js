import { createUser, getUsers, getUserByEmailOrUsername, updateUser } from '../db/user.js'
import { userTransformer } from '../transformers/user.js';

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
    const result = await getUserByEmailOrUsername(req.body);
    res.json(result);
  },
  update: async (req, res) => {
    const result = await updateUser(req.params.id, req.body);
    return result;
  },
};