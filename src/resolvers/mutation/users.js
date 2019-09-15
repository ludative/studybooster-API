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

const updateUser = async (_, { params }) => {
  const user = await models.User.findByPk(params.id);
  if (!user) throw new Error("존재하지 않는 회원입니다.");
  console.log("user", user.get());
  console.log("user", { ...params });
  await user.update({ ...params });

  const _user = await models.User.findByPk(params.id);

  return _user.get();
};

const usersMutation = {
  signUp,
  updateUser
};

export default usersMutation;
