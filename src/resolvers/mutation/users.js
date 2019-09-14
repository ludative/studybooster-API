import models from "../../models";
import bcrypt from "bcrypt-nodejs";

// 회원가입
const signUp = async (_, { params }) => {
  const [user, created] = await models.User.findOrCreate({
    where: { email: params.email },
    defaults: {
      ...params,
      password: bcrypt.hashSync(params.password)
    }
  });

  if (!created) {
    throw new Error("이미 가입된 이메일 주소입니다.");
  }

  return user;
};

const usersMutation = {
  signUp
};

export default usersMutation;
