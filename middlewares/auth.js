// import jwt from 'jsonwebtoken';

// // Only userAuth is defined here
// const userAuth = async (req, res, next) => {
//   const { token } = req.headers;

//   if (!token) {
//     return res.json({ success: false, message: 'Not Authorized. Login Again' });
//   }

//   try {
//     const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

//     if (tokenDecode.id) {
//       req.body.userId = tokenDecode.id;
//       next();
//     } else {
//       return res.json({ success: false, message: 'Not Authorized. Login Again' });
//     }
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };


// export { userAuth };


import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  try {
    // ✅ Check Authorization header (preferred) or fallback to custom token
    const authHeader = req.headers["authorization"] || req.headers["token"];

    if (!authHeader) {
      return res.json({ success: false, message: "Not Authorized. Login Again" });
    }

    // ✅ If using "Bearer <token>" format, split it
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      return res.json({ success: false, message: "Not Authorized. Invalid Token" });
    }

    // ✅ Attach userId to request object
    req.userId = decoded.id;

    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.json({ success: false, message: "Invalid or Expired Token" });
  }
};

export { userAuth };


