import UrlPattern from "url-pattern";
import { decodeAccessToken } from "../utils/jwt.js";
import { getUserById } from "../db/user.js";
import { userTransformer } from "../transformers/user.js";
import { getVendorById } from "../db/vendor.js";
import { vendorMinimalTransformer } from "../transformers/vendor.js";

const authMiddleware = async (req, res, next) => {
  const needVendor = [
    { method: "POST", endpoint: "/product" },
    { method: "GET", endpoint: "/vendor/dashboard" },
    { method: "GET", endpoint: "/vendor/dashboard/order" },
    { method: "GET", endpoint: "/auth/vendor" },
  ];
  const endpoints = [
    { method: "GET", endpoint: "/auth/user" },
    { method: "PUT", endpoint: "/auth/user" },
    { method: "PUT", endpoint: "/auth/user/profile" },
    { method: "POST", endpoint: "/news" },
    { method: "POST", endpoint: "/vendor" },
    { method: "POST", endpoint: "/review/:vendorId" },
    { method: "POST", endpoint: "/vendor/:slug/reviews" },
    { method: "POST", endpoint: "/cart" },
    { method: "GET", endpoint: "/cart" },
    { method: "POST", endpoint: "/order" },
    { method: "GET", endpoint: "/order" },
    { method: "GET", endpoint: "/order/:status" },
    { method: "GET", endpoint: "/order/track" },
    { method: "GET", endpoint: "/order/history" },
    { method: "PUT", endpoint: "/order/item/:id" },
  ];

  const isHandled = [...needVendor, ...endpoints].some(({ method, endpoint }) => {
    const pattern = new UrlPattern(endpoint, true);

    // Cek apakah URL dan metode HTTP sesuai
    return pattern.match(req.url.split("?")[0]) && req.method === method;
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

    const isNeedVendor = needVendor.some(({ method, endpoint }) => {
      const pattern = new UrlPattern(endpoint, true);

      // Cek apakah URL dan metode HTTP sesuai
      return pattern.match(req.url.split("?")[0]) && req.method === method;
    });

    if (!isNeedVendor) {
      return next();
    }

    if (!user.vendorId) {
      return res.status(401).json({ message: "You didnt have any vendor" });
    }
    const vendorId = user.vendorId;

    const vendor = await getVendorById(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    req.auth.vendor = vendorMinimalTransformer(vendor);

    // Lanjutkan ke middleware berikutnya atau route handler
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default authMiddleware;
