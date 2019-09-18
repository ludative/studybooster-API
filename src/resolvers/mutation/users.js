import models from "../../models";
import { createToken } from "../../utils/token";
import { encryptPassword, comparePassword } from "../../utils/bcrypt";

// 회원가입
const signUp = async (_, { params }) => {
  const [user, created] = await models.User.findOrCreate({
    where: { email: params.email },
    defaults: {
      ...params,
      password: encryptPassword(params.password)
    }
  });

  if (!created) {
    throw new Error("이미 가입된 이메일 주소입니다.");
  }

  return user;
};
// 로그인
const signIn = async (_, { email, password }) => {
  const user = await models.User.findOne({
    where: {
      email
    }
  });

  if (!user) throw new Error("이메일을 확인해주세요.");

  const isValidPassword = comparePassword(password, user.password);
  if (!isValidPassword) throw new Error("비밀번호를 확인해주세요.");

  const payload = { email, id: user.id };
  const token = await createToken(payload);

  return { user, token };
};

const updateUser = async (_, { params }, context) => {
  if (!context.user) throw new Error("잘못된 접근입니다.");
  const user = context.user;
  params.password = encryptPassword(params.password);
  await user.update({ ...params });

  return user;
};

const usersMutation = {
  signUp,
  signIn,
  updateUser
};

export default usersMutation;
