import bcrypt from "bcrypt-nodejs";

// 비밀번호 암호화
export const encryptPassword = password => {
  return bcrypt.hashSync(password);
};

// 비밀번호 복호화
export const comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};
