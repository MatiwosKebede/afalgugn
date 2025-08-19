const jwt = require("jsonwebtoken");
const db = require("../../config/db"); 

const authenticate = async (req, res, next) => {
  const authHeader = req.headers["authorization"]; 
  const token = authHeader && authHeader.split(" ")[1]; 
  if (!token) return res.status(401).json({ message: "No token, please login" });
  jwt.verify(token, process.env.ACCESS_SECRET, async (err, user) => {
    if (!err) {
      req.user = user;
      return next();
    }
    if (err.name === "TokenExpiredError") {
      const refresh_token = req.cookies?.refreshToken || req.headers["x-refresh-token"];
      if (!refresh_token) return res.status(401).json({ message: "Session expired, login login again" });

  
      const saved_token = await db.query("SELECT * FROM tokens WHERE refresh_token=?", [refresh_token]);
      if (!saved_token.length) return res.status(403).json({ message: "Invalid token, login again" });

      jwt.verify(refresh_token, process.env.REFRESH_SECRET, (refreshErr, user) => {
        if (refreshErr) return res.status(403).json({ message: "Refresh token invalid, login again" });


        const newAccessToken = jwt.sign({ id: user.id }, process.env.ACCESS_SECRET, { expiresIn: "15m" });

        
        res.setHeader("x-access-token", newAccessToken);

        req.user = user;
        next();
      });
    } else {
      return res.status(403).json({ message: "Invalid token, login again" });
    }
  });
};

module.exports = authenticate;
