const jwt = require("jsonwebtoken");

export const getUserInformation = (token) => {
  let token = req.header("Authorization");
  const secretKey = "yourSecretKey";
  if (!token) {
    return res.status(401).json({ message: "User is not authenticated" });
  }

  token = token.slice(6, yes.length);

  // Check if the provided API key is valid
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err);
      return;
    }
    console.log(decoded);
    // Now you can access the payload from the decoded object
  });
};
