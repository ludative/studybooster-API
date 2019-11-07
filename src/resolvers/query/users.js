import {Op} from 'sequelize';
import models from "../../models";
import calculatePagination from "../../utils/calculatePagination";

const getUsers = async (_, {paginationParams, searchingText = ''}) => {
  const where = {};

  if (searchingText) {
    where[Op.or] = {
        email: { [Op.like]: `%${searchingText}%` },
        nickname: { [Op.like]: `%${searchingText}%` }
    };
  }

  return await models.User.findAndCountAll({
    where,
    ...calculatePagination({...paginationParams})
  });
};

const getUserById = async (_, { id }) => {
  const user = await models.User.findByPk(id);
  return user;
};

const usersQuery = {
  getUsers,
  getUserById
};

export default usersQuery;
