import models from "../../models";
import calculatePagination from "../../utils/calculatePagination";
import { authenticatedMiddleware } from "../../utils/middleware";

const getStudyAttends = async (_, { paginationParams, params }, context) => {
  const { StudyId, UserId } = params;
  const attends = await models.StudyAttend.findAndCountAll({
    where: { StudyId, UserId },
    order: [["createdAt", "DESC"]],
    ...calculatePagination({ ...paginationParams })
  });

  return { count: attends.count, rows: attends.rows };
};

const getStudyAttendById = async (_, { id }) => {
  return await models.StudyAttend.findByPk(id);
};

const studyAttendQuery = {
  getStudyAttends,
  getStudyAttendById
};

export default studyAttendQuery;
