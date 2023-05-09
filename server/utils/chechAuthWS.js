import jwt from "jsonwebtoken";

export function checkAuthWS(token) {
  if (!token) return;

  const decoded = jwt.verify(token, "secret123");
  return decoded._id;
}
