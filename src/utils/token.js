require("dotenv").config();

import jwt from "jsonwebtoken";

// 토큰 생성
export const createToken = payload => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.PRIVATE_KEY, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

// 토큰 검증
export const verifyToken = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
};
