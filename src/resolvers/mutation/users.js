import dotenv from 'dotenv';
import models from "../../models";
import { createToken } from "../../utils/token";
import { encryptPassword, comparePassword } from "../../utils/bcrypt";
import {getMailResetPassword, getMailValidationContent, sendMail} from "../../utils/mailer";
import generateRandomString from "../../utils/genarateRandomString";
import {authenticatedMiddleware} from "../../utils/middleware";

dotenv.config();

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

  const payload = { email, id: user.id };
  const token = await createToken(payload);

  await sendMail(getMailValidationContent({email, token}));

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

// 로그인 후 이메일 재발송
const sendMailValidation = async (_, arg, {user, token}) => {
  await sendMail(getMailValidationContent({email: user.email, token}));
  return {isSuccess: true};
};

const updateUser = async (_, { params }, context) => {
  const user = context.user;
  if (params.password) {
    params.password = encryptPassword(params.password);
  }
  await user.update({ ...params });

  return user;
};

const updatePassword = async (_, {password, newPassword}, {user}) => {
  const isValidPrevPassword = comparePassword(password, user.password);
  if (!isValidPrevPassword) throw new Error("비밀번호가 일치하지 않습니다.");
  await user.update({ password: encryptPassword(newPassword) });
  return user;
};

const resetPassword = async (_, {email}) => {
  const user = await models.User.findOne({
    where: {email}
  });
  if (!user) throw new Error('일치하는 이메일이 존재하지 않습니다.');
  const newPassword = generateRandomString();
  await sendMail(getMailResetPassword({email: user.email, newPassword}));
  await user.update({ password: encryptPassword(newPassword) });
  return {isSuccess: true};
};

const deleteUser = async (_, args, {user}) => {
  const userStudies = await models.Study.findAll({
    where: {
      UserId: user.id
    }
  });

  const promises = [];
  const userStudyIds = [];

  userStudies.forEach(userStudy => {
    promises.push(userStudy.destroy());
    userStudyIds.push(userStudy.id);
  });

  if (userStudyIds.length) {
    userStudyIds.forEach(userStudyId => {
      promises.push(
          models.StudyBoard.destroy({
            where: {
              StudyId: userStudyId
            }
          }),
          models.StudyDay.destroy({
            where: {
              StudyId: userStudyId
            }
          })
      )
    })
  }

  await Promise.all([
      ...promises,
      models.StudyBoard.destroy({
        where: {
          UserId: user.id
        }
      }),
      user.destroy()
  ]);

  return {isSuccess: true};
};

const usersMutation = {
  signUp,
  signIn,
  sendMailValidation: authenticatedMiddleware(sendMailValidation),
  updateUser: authenticatedMiddleware(updateUser),
  updatePassword: authenticatedMiddleware(updatePassword),
  resetPassword,
  deleteUser: authenticatedMiddleware(deleteUser)
};

export default usersMutation;
