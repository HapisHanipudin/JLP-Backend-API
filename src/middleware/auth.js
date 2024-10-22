import UrlPattern from "url-pattern";
import { decodeAccessToken } from "../utils/jwt.js";
import { getUserById } from "../db/user.js";
import { userTransformer } from "../transformers/user.js";

const authMiddleware = async (req, res, next) => {
  const endpoints = ["/auth/user", "/news/post"];

  const isHandled = endpoints.some((endpoint) => {
    const pattern = new UrlPattern(endpoint);
    return pattern.match(req.url); // Sesuaikan dengan Express (req.url)
  });

  // Jika URL tidak sesuai dengan endpoint yang ditangani, lanjutkan tanpa autentikasi
  if (!isHandled) {
    return next();
  }

  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  const decoded = decodeAccessToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await getUserById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Menyimpan user di request context (req.auth)
    req.auth = userTransformer(user);

    // Lanjutkan ke middleware berikutnya atau route handler
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default authMiddleware;
