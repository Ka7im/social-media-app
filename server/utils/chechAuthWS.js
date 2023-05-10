import jwt from "jsonwebtoken";

export function checkAuthWS(token) {
  if (!token) return;

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  return decoded._id;
}
