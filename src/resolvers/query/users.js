import { Op } from "sequelize";
import models from "../../models";
import calculatePagination from "../../utils/calculatePagination";
import { authenticatedMiddleware } from "../../utils/middleware";

const getUsers = async (_, { paginationParams, searchingText = "" }) => {
  const where = {};

  if (searchingText) {
    where[Op.or] = {
      email: { [Op.like]: `%${searchingText}%` },
      nickname: { [Op.like]: `%${searchingText}%` }
    };
  }

  return await models.User.findAndCountAll({
    where,
    ...calculatePagination({ ...paginationParams })
  });
};

const getUserById = async (_, { id }) => {
  const user = await models.User.findByPk(id);
  return user;
};

const getUserByToken = async (_, args, { user }) => {
  return await models.User.findByPk(user.id);
};

const usersQuery = {
  getUsers,
  getUserById,
  getUserByToken: authenticatedMiddleware(getUserByToken)
};

export default usersQuery;
